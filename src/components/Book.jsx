import { useCursor, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useAtom } from "jotai";
import { easing } from "maath";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
} from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { pageAtom, pages } from "./PageNavigation";

// Animation & Easing
const easingFactor = 0.5; // Speed of page rotation easing
const easingFactorFold = 0.3; // Speed of page fold easing
const turningTimeMax = 400; // Duration of page turn animation in ms

// Curve Strengths
const curveStrength = {
  inside: 0.18, // Curve intensity for pages near the spine
  outside: 0.05, // Curve intensity for pages far from spine
  turning: 0.09, // Curve intensity during page turn animation
};

// Page Geometry
const pageDimensions = {
  width: 1.28,
  height: 1.71, // 4:3 aspect ratio
  depth: 0.003,
  segments: 30, // Number of bone segments for realistic paper bending
};

const pageWidth = pageDimensions.width;
const pageHeight = pageDimensions.height;
const pageDepth = pageDimensions.depth;
const pageSegments = pageDimensions.segments;
const segmentWidth = pageWidth / pageSegments;

// Geometry Setup
function createPageGeometry() {
  const geometry = new BoxGeometry(
    pageWidth,
    pageHeight,
    pageDepth,
    pageSegments,
    2
  );
  geometry.translate(pageWidth / 2, 0, 0); // Offset geometry so it rotates around the spine edge
  
  setupBoneSkinning(geometry);
  return geometry;
}

// Configure bone skinning data for realistic page deformation
function setupBoneSkinning(geometry) {
  const position = geometry.attributes.position;
  const vertex = new Vector3();
  const skinIndexes = [];
  const skinWeights = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;

    // Calculate which bones influence this vertex
    const skinIndex = Math.max(0, Math.floor(x / segmentWidth));
    const skinWeight = (x % segmentWidth) / segmentWidth;

    // Store bone indices and weights (Four per vertex for Three.js SkinnedMesh)
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  geometry.setAttribute(
    "skinIndex",
    new Uint16BufferAttribute(skinIndexes, 4)
  );
  geometry.setAttribute(
    "skinWeight",
    new Float32BufferAttribute(skinWeights, 4)
  );
}

// Create materials for page rendering (front, back, and edges)
function createPageMaterials(frontTexture, backTexture) {
  const edgeColor = new Color("#bbb");
  const emissiveColor = new Color("orange");

  // Border materials (spine edge, left/right edges)
  const baseMaterials = [
    new MeshStandardMaterial({ color: edgeColor }),
    new MeshStandardMaterial({ color: "#111" }),
    new MeshStandardMaterial({ color: edgeColor }),
    new MeshStandardMaterial({ color: edgeColor }),
  ];

  // Front and back face materials with textures
  const texturedMaterials = [
    new MeshStandardMaterial({
      color: edgeColor,
      map: frontTexture,
      roughness: 0.5,
      emissive: emissiveColor,
      emissiveIntensity: 0,
    }),
    new MeshStandardMaterial({
      color: edgeColor,
      map: backTexture,
      roughness: 0.5,
      emissive: emissiveColor,
      emissiveIntensity: 0,
    }),
  ];

  return [...baseMaterials, ...texturedMaterials];
}

// Create bone skeleton for page deformation
function createBoneSkeleton() {
  const bones = [];

  for (let i = 0; i <= pageSegments; i++) {
    const bone = new Bone();
    bones.push(bone);

    // Position bone along the spine
    bone.position.x = i === 0 ? 0 : segmentWidth;

    // Connect bones hierarchically
    if (i > 0) {
      bones[i - 1].add(bone);
    }
  }

  return new Skeleton(bones);
}

// Preload page textures on app start for faster loading
pages.forEach((pageData) => {
  useTexture.preload(`/pages/${pageData.front}.jpg`);
  useTexture.preload(`/pages/${pageData.back}.jpg`);
});

// Static Geometry
const pageGeometry = createPageGeometry();

// Page
const Page = ({ number, front, back, page, opened, bookClosed, ...props }) => {
  const [picture, picture2] = useTexture(
    [`/pages/${front}.jpg`, `/pages/${back}.jpg`],
    (textures) => {
      // Ensure correct color space for proper texture rendering
      textures.forEach((t) => (t.colorSpace = SRGBColorSpace));
    },
    (error) => {
      console.error("Texture loading error:", error);
    }
  );

  const group = useRef();
  const skinnedMeshRef = useRef();
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);

  // Setup Skeletal Mesh
  const skinnedMesh = useMemo(() => {
    const skeleton = createBoneSkeleton();
    const materials = createPageMaterials(picture, picture2);

    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);

    return mesh;
  }, [picture, picture2]);

  // Page Turning & Bone Rotation
  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) {
      return;
    }

    // Update highlight glow based on hover state
    const emissiveIntensity = highlighted ? 0.22 : 0;
    skinnedMeshRef.current.material[4].emissiveIntensity =
      skinnedMeshRef.current.material[5].emissiveIntensity = MathUtils.lerp(
        skinnedMeshRef.current.material[4].emissiveIntensity,
        emissiveIntensity,
        0.1
      );

    // Track when page state changes to animate turn
    if (lastOpened.current !== opened) {
      turnedAt.current = +new Date();
      lastOpened.current = opened;
    }

    // Calculate turn animation progress (0 to 1 to 0, sine wave)
    let turningTime = Math.min(turningTimeMax, new Date() - turnedAt.current) / turningTimeMax;
    turningTime = Math.sin(turningTime * Math.PI);

    // Calculate target rotation for this page
    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) {
      targetRotation += degToRad(number * 0.8);
    }

    // Animate each bone segment to create realistic page curve
    const bones = skinnedMeshRef.current.skeleton.bones;
    for (let i = 0; i < bones.length; i++) {
      const target = i === 0 ? group.current : bones[i];

      // Calculate curvature for different parts of the page
      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity = Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      // Calculate final rotation angle combining all effects
      let rotationAngle =
        curveStrength.inside * insideCurveIntensity * targetRotation -
        curveStrength.outside * outsideCurveIntensity * targetRotation +
        curveStrength.turning * turningIntensity * targetRotation;

      let foldRotationAngle = degToRad(Math.sign(targetRotation) * 2);

      // Override rotation when book is fully closed/opened
      if (bookClosed) {
        rotationAngle = i === 0 ? targetRotation : 0;
        foldRotationAngle = 0;
      }

      // Smoothly animate to target rotation
      easing.dampAngle(
        target.rotation,
        "y",
        rotationAngle,
        easingFactor,
        delta
      );

      // Apply fold effect (3D depth)
      const foldIntensity = i > 8
        ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
        : 0;

      easing.dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta
      );
    }
  });

  // Interaction
  const [_, setPage] = useAtom(pageAtom);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  // RENDER
  return (
    <group
      {...props}
      ref={group}
      onPointerEnter={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={skinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * pageDepth + page * pageDepth}
      />
    </group>
  );
};

// Book
export const Book = ({ ...props }) => {
  const [page] = useAtom(pageAtom);
  const [delayedPage, setDelayedPage] = useState(page);

  // Interpolated Page Transitions
  useEffect(() => {
    let timeout;

    const goToPage = () => {
      setDelayedPage((currentDelayedPage) => {
        if (page === currentDelayedPage) {
          return currentDelayedPage;
        }

        // Stagger page animations: faster for nearby pages, slower for distant pages
        const distance = Math.abs(page - currentDelayedPage);
        const delay = distance > 2 ? 50 : 150;

        timeout = setTimeout(goToPage, delay);

        // Move one page at a time toward target
        if (page > currentDelayedPage) {
          return currentDelayedPage + 1;
        }
        if (page < currentDelayedPage) {
          return currentDelayedPage - 1;
        }

        return currentDelayedPage;
      });
    };

    goToPage();

    return () => {
      clearTimeout(timeout);
    };
  }, [page]);

  // RENDER
  return (
    <group {...props} rotation-y={-Math.PI / 2}>
      {pages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          {...pageData}
        />
      ))}
    </group>
  );
};