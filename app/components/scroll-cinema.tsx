"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import { useMotionPause, useReducedMotionPreference } from "./cinematic";
import { motionDuration, gsapEase, organicCameraEase } from "./motion-system";
import "./scroll-cinema.css";

type LayerMotion = {
  selector: string;
  x: number;
  y: number;
  turn?: number;
  depth?: number;
  scale?: number;
  reveal?: boolean;
};

type ChapterMotion = {
  name: string;
  aperture: [string, string];
  words: [number, number, number];
  pan: number;
  layers: LayerMotion[];
};

const openFrame = "inset(0% 0% 0% 0% round 0px)";
const openPolygon = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

/** Each chapter has its own camera, opening gesture and reading direction. */
const chapters: Record<string, ChapterMotion> = {
  inicio: {
    name: "origin",
    aperture: ["inset(0% 34% 0% 0% round 30px)", openFrame],
    words: [-14, 104, -2],
    pan: 1,
    layers: [
      { selector: ".hero-copy", x: 0, y: 26, depth: -20 },
      { selector: ".hero-art", x: 32, y: -12, depth: -42 },
      { selector: ".hero-bottom", x: -16, y: 8 },
    ],
  },
  sobre: {
    name: "observation",
    aperture: ["inset(0% 96% 0% 0% round 0px)", openFrame],
    words: [26, 70, 0],
    pan: -1,
    layers: [
      { selector: ".editorial-figure", x: -38, y: 12, turn: -0.7 },
      { selector: ".editorial-copy", x: 28, y: -12, depth: -25 },
    ],
  },
  "por-que-biocrab": {
    name: "three-origins",
    aperture: ["polygon(0% 0%, 4% 0%, 26% 100%, 0% 100%)", openPolygon],
    words: [-20, 86, 2],
    pan: 0.8,
    layers: [
      { selector: ".section-heading", x: -20, y: 18 },
      { selector: ".why-card", x: 22, y: 34, turn: 0.7, depth: -30 },
    ],
  },
  innovacion: {
    name: "connections",
    aperture: ["polygon(0% 0%, 100% 0%, 8% 8%, 0% 0%)", openPolygon],
    words: [34, 54, -2],
    pan: -0.8,
    layers: [
      { selector: ".section-heading", x: 24, y: 8 },
      { selector: ".technology-depth", x: -24, y: 28, depth: -55, scale: 0.97 },
      { selector: ".technology-copy", x: 26, y: -22 },
    ],
  },
  "del-residuo-al-biomaterial": {
    name: "transformation",
    aperture: ["circle(8% at 12% 50%)", "circle(145% at 12% 50%)"],
    words: [-32, 76, 0],
    pan: 1,
    layers: [
      { selector: ".section-heading", x: -26, y: 10 },
      { selector: ".journey-route", x: 38, y: 0, reveal: true },
      { selector: ".journey-detail", x: 0, y: 28, depth: -35 },
    ],
  },
  investigacion: {
    name: "hypothesis",
    aperture: ["inset(47% 0% 47% 0% round 2px)", openFrame],
    words: [0, 116, -1],
    pan: -1,
    layers: [
      { selector: ".section-heading", x: 0, y: 28 },
      { selector: ".research-photo", x: -14, y: 24, scale: 0.965, depth: -45 },
      { selector: ".research-copy", x: 18, y: -26 },
      { selector: ".research-evidence-strip", x: 14, y: 12 },
    ],
  },
  metodologia: {
    name: "procedure",
    aperture: ["inset(0% 0% 94% 0% round 0px)", openFrame],
    words: [0, -92, 0],
    pan: 0.7,
    layers: [
      { selector: ".section-heading", x: 0, y: -18 },
      {
        selector: ".method-reference-feature figure",
        x: 12,
        y: 30,
        depth: -30,
      },
      { selector: ".method-reference-copy", x: -18, y: 8 },
    ],
  },
  recorrido: {
    name: "research-route",
    aperture: ["inset(0% 86% 0% 0% round 48px)", openFrame],
    words: [-38, 42, 0],
    pan: 1,
    layers: [
      { selector: ".section-heading", x: -28, y: 0 },
      { selector: ".timeline-tabs", x: 38, y: 8 },
      { selector: ".timeline-panel", x: 24, y: 18, turn: -0.45, depth: -28 },
    ],
  },
  comparacion: {
    name: "perspectives",
    aperture: ["inset(0% 49% 0% 49% round 8px)", openFrame],
    words: [38, 38, -1],
    pan: -0.65,
    layers: [
      { selector: ".section-heading", x: -22, y: 16 },
      {
        selector: ".material-comparator",
        x: 0,
        y: 20,
        depth: -32,
        reveal: true,
      },
    ],
  },
  "aplicaciones-futuras": {
    name: "possibilities",
    aperture: [
      "ellipse(12% 18% at 50% 100%)",
      "ellipse(125% 150% at 50% 100%)",
    ],
    words: [-12, 108, 2],
    pan: 0.9,
    layers: [
      { selector: ".section-heading", x: 0, y: 26 },
      { selector: ".future-card", x: -16, y: 38, turn: -0.65, depth: -38 },
    ],
  },
  "vision-futura": {
    name: "future-horizon",
    aperture: ["circle(10% at 85% 25%)", "circle(145% at 85% 25%)"],
    words: [30, 92, -2],
    pan: -1,
    layers: [
      { selector: ":scope > figure", x: 24, y: 14, depth: -48, scale: 0.97 },
      { selector: ":scope > div", x: -30, y: -18 },
    ],
  },
  "impacto-potencial": {
    name: "complete-cycle",
    aperture: ["ellipse(10% 14% at 50% 50%)", "ellipse(85% 90% at 50% 50%)"],
    words: [-24, 68, 1],
    pan: 0.8,
    layers: [
      { selector: ".impact-copy", x: -28, y: 16 },
      { selector: ".impact-photo", x: 24, y: -20, turn: 0.7, depth: -36 },
      { selector: ".circular-overlay", x: -10, y: 18 },
    ],
  },
  gomitas: {
    name: "texture",
    aperture: ["inset(94% 0% 0% 0% round 42px)", openFrame],
    words: [0, 112, -3],
    pan: -0.9,
    layers: [
      { selector: ".gummy-visual", x: 0, y: 36, scale: 0.97, depth: -25 },
      { selector: ".gummy-copy", x: -26, y: -12 },
      { selector: ".gummy-label", x: 22, y: 8 },
    ],
  },
  equipo: {
    name: "next-chapter",
    aperture: ["polygon(0% 100%, 100% 100%, 88% 100%, 12% 100%)", openPolygon],
    words: [-18, 90, 0],
    pan: 0.6,
    layers: [
      { selector: ".section-heading", x: -14, y: 20 },
      { selector: ".project-figure", x: -26, y: 10, turn: -0.5, depth: -32 },
      { selector: ".project-copy", x: 24, y: -14 },
      { selector: ".contact-layout", x: 0, y: 28, scale: 0.985 },
    ],
  },
};

function chapterFor(element: Element) {
  return chapters[element.closest("section")?.id || ""] || chapters.inicio;
}

function headingText(children: ReactNode): string {
  return Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number")
        return String(child);
      if (isValidElement<{ children?: ReactNode }>(child))
        return headingText(child.props.children);
      return "";
    })
    .join(" ");
}

/** React owns every word, including when an interactive research title changes. */
function splitWords(children: ReactNode): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") {
      return child.split(/(\s+)/).map((word, index) =>
        /^\s+$/.test(word) || !word ? (
          word
        ) : (
          <span className="cinema-word-mask" key={`${index}-${word}`}>
            <span className="cinema-word">{word}</span>
          </span>
        ),
      );
    }
    if (isValidElement<{ children?: ReactNode }>(child)) {
      if (!child.props.children) return child;
      const element = child as ReactElement<{
        children?: ReactNode;
        className?: string;
      }>;
      return cloneElement(
        element,
        child.type === "span"
          ? { className: `${element.props.className || ""} cinema-emphasis` }
          : undefined,
        splitWords(child.props.children),
      );
    }
    return child;
  });
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3" | "h4";
  children: ReactNode;
};

export function KineticHeading({
  as: Tag = "h2",
  children,
  className = "",
  ...props
}: HeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();
  const content = useMemo(() => splitWords(children), [children]);
  const text = headingText(children);

  useEffect(() => {
    if (reduced || paused) return;
    let disposed = false;
    let revert = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed || !ref.current) return;
        gsap.registerPlugin(ScrollTrigger);
        const heading = ref.current;
        const desktop = window.matchMedia("(min-width: 900px)").matches;
        const [wordX, wordY, wordTurn] = chapterFor(heading).words;
        const context = gsap.context(() => {
          const words = heading.querySelectorAll<HTMLElement>(".cinema-word");
          gsap.fromTo(
            words,
            {
              xPercent: wordX * (desktop ? 1 : 0.45),
              yPercent: wordY,
              rotation: desktop ? wordTurn : 0,
              rotateX: desktop ? -18 : 0,
              scale: 0.94,
            },
            {
              xPercent: 0,
              yPercent: 0,
              rotation: 0,
              rotateX: 0,
              scale: 1,
              duration: motionDuration.component,
              stagger: { amount: motionDuration.reveal },
              ease: gsapEase.content,
              immediateRender: false,
              onStart: () => {
                words.forEach((word) => {
                  word.style.willChange = "transform";
                });
              },
              clearProps: "filter,willChange",
              scrollTrigger: {
                trigger: heading,
                start: "top 91%",
                once: true,
              },
            },
          );
        }, heading);
        revert = () => context.revert();
      },
    );
    return () => {
      disposed = true;
      revert();
    };
  }, [paused, reduced, text]);

  return (
    <Tag ref={ref} className={`cinema-heading ${className}`} {...props}>
      {content}
    </Tag>
  );
}

/** One coordinated scroll clock; touch devices retain their native scrolling. */
export function ScrollCinema() {
  const reduced = useReducedMotionPreference();
  const paused = useMotionPause();
  const [desktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 900px) and (hover: hover) and (pointer: fine)",
    );
    const update = () => setDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (desktop === null) return;
    if (reduced || paused) {
      document.documentElement.dataset.scrollEngine = "still";
      return () => {
        delete document.documentElement.dataset.scrollEngine;
      };
    }
    let disposed = false;
    let dispose = () => {};
    const isDesktop = desktop;

    async function start() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = isDesktop
        ? new (await import("lenis")).default({
            duration: motionDuration.chapter,
            easing: gsapEase.editorial,
            smoothWheel: true,
            syncTouch: false,
            autoRaf: false,
            anchors: { offset: -110 },
          })
        : null;
      if (disposed) {
        lenis?.destroy();
        return;
      }

      const seen = new WeakSet<Element>();
      const sections: HTMLElement[] = [];
      const scenes: HTMLElement[] = [];
      const layers: HTMLElement[] = [];
      const assemblies: HTMLElement[] = [];
      const chapterListeners: (() => void)[] = [];
      const loops: {
        photo: HTMLElement;
        tween: gsap.core.Tween;
        visible: boolean;
        release: () => void;
      }[] = [];
      const context = gsap.context(() => {});
      let scanFrame = 0;

      /** These are assembled scenes, not a common reveal with new coordinates.
       * Each timeline connects the existing objects that explain its chapter.
       * Only local custom properties move; React and Motion retain their values.
       * This is a normalized 0..1 spatial timeline: span/at numbers describe
       * fractions of a chapter's scroll distance, not wall-clock durations.
       * Its temporal settling uses the shared scrub duration above.
       */
      function choreograph(section: HTMLElement) {
        const camera = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: section.id === "inicio" ? "top top" : "top 82%",
            end: "bottom 26%",
            scrub: isDesktop ? motionDuration.chapter : motionDuration.reveal,
          },
        });
        camera.fromTo(
          section,
          { "--chapter-phase": 0 },
          { "--chapter-phase": 1, duration: 1, ease: "none" },
          0,
        );
        type CameraValues = Record<string, string | number>;
        function object(
          selector: string,
          from: CameraValues,
          to: CameraValues,
          at = 0,
          span = 0.75,
        ) {
          const targets = section.querySelectorAll<HTMLElement>(selector);
          targets.forEach((target, index) => {
            target.classList.add("cinema-assembly");
            assemblies.push(target);
            const mobile = (values: CameraValues) =>
              Object.fromEntries(
                Object.entries(values).map(([key, value]) => {
                  if (isDesktop || typeof value !== "string")
                    return [key, value];
                  // A touch camera keeps its depth cues within the small frame.
                  const numeric = Number.parseFloat(value);
                  return /(?:deg|px)$/.test(value)
                    ? [
                        key,
                        `${numeric * 0.3}${value.endsWith("deg") ? "deg" : "px"}`,
                      ]
                    : [key, value];
                }),
              );
            camera.fromTo(
              target,
              mobile(from),
              { ...mobile(to), duration: span, ease: "none" },
              Math.min(at + index * 0.045, 0.65),
            );
          });
        }
        function draw(selector: string, at = 0.05, span = 0.6) {
          object(
            selector,
            { "--assembly-progress": 0 },
            { "--assembly-progress": 1 },
            at,
            span,
          );
        }

        switch (section.id) {
          case "inicio":
            // Title lines and molecule occupy separate camera distances. The
            // token entrance remains owned by HeroTitle's masked word motion.
            object(
              ".hero-title .text-mask:first-child",
              {
                "--assembly-pitch": "9deg",
                "--assembly-depth": "42px",
                "--assembly-rise": "10px",
              },
              {
                "--assembly-pitch": "-3deg",
                "--assembly-depth": "0px",
                "--assembly-rise": "-14px",
              },
              0,
              1,
            );
            object(
              ".hero-title .text-mask:last-child",
              {
                "--assembly-yaw": "-5deg",
                "--assembly-depth": "86px",
                "--assembly-rise": "28px",
              },
              {
                "--assembly-yaw": "2deg",
                "--assembly-depth": "8px",
                "--assembly-rise": "-16px",
              },
              0,
              1,
            );
            object(
              ".hero-art",
              {
                "--assembly-yaw": "-8deg",
                "--assembly-pitch": "5deg",
                "--assembly-depth": "-65px",
              },
              {
                "--assembly-yaw": "5deg",
                "--assembly-pitch": "-3deg",
                "--assembly-depth": "22px",
              },
              0,
              1,
            );
            draw(".hero-grid", 0, 1);
            break;
          case "sobre":
            // Fragmented links resolve into one connected material map.
            draw(".editorial-figure", 0.08, 0.68);
            object(
              ".editorial-figure > .parallax-frame",
              {
                "--assembly-yaw": "-12deg",
                "--assembly-depth": "-75px",
              },
              { "--assembly-yaw": "2deg", "--assembly-depth": "0px" },
              0,
              0.85,
            );
            object(
              ".inline-note",
              { "--assembly-pitch": "-7deg" },
              {
                "--assembly-pitch": "0deg",
              },
              0.28,
              0.6,
            );
            break;
          case "por-que-biocrab":
            // Three specimen mounts converge on a shared baseline.
            draw(".why-card", 0.04, 0.52);
            object(
              ".why-card:nth-child(1) .why-copy",
              {
                "--assembly-yaw": "12deg",
                "--assembly-depth": "-55px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
            );
            object(
              ".why-card:nth-child(2) .why-copy",
              {
                "--assembly-pitch": "-9deg",
                "--assembly-depth": "-80px",
              },
              { "--assembly-pitch": "0deg", "--assembly-depth": "0px" },
              0.12,
            );
            object(
              ".why-card:nth-child(3) .why-copy",
              {
                "--assembly-yaw": "-12deg",
                "--assembly-depth": "-55px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
              0.2,
            );
            break;
          case "innovacion":
            // Crossed registration planes settle around the material portrait.
            draw(".technology-visual", 0.08, 0.75);
            object(
              ".technology-visual",
              {
                "--assembly-pitch": "8deg",
                "--assembly-yaw": "-10deg",
              },
              { "--assembly-pitch": "-2deg", "--assembly-yaw": "3deg" },
              0,
              1,
            );
            draw(".technology-copy > p", 0.18, 0.6);
            break;
          case "del-residuo-al-biomaterial":
            // A single continuous stitch reaches each of the five icons.
            draw(".journey-route", 0.02, 0.62);
            object(
              ".journey-icon",
              {
                "--assembly-yaw": "-55deg",
                "--assembly-depth": "-22px",
                "--assembly-progress": 0,
              },
              {
                "--assembly-yaw": "0deg",
                "--assembly-depth": "0px",
                "--assembly-progress": 1,
              },
              0.07,
              0.45,
            );
            draw(".journey-detail", 0.25, 0.6);
            object(
              ".journey-detail > .parallax-frame",
              {
                "--assembly-yaw": "14deg",
                "--assembly-pitch": "-4deg",
                "--assembly-depth": "-65px",
              },
              {
                "--assembly-yaw": "0deg",
                "--assembly-pitch": "1deg",
                "--assembly-depth": "0px",
              },
              0.18,
              0.8,
            );
            break;
          case "investigacion":
            // A moving specimen bracket and a ruled paper plane give the
            // photograph and the research question separate focal distances.
            draw(".research-photo", 0.1, 0.74);
            object(
              ".research-stamp",
              {
                "--assembly-yaw": "22deg",
                "--assembly-depth": "75px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
              0.2,
              0.5,
            );
            draw(".research-detail", 0.16, 0.52);
            section
              .querySelectorAll<HTMLDetailsElement>(".research-detail")
              .forEach((detail) => {
                const openPaper = () => {
                  if (!detail.open || document.hidden) return;
                  context.add(() => {
                    gsap.fromTo(
                      detail.querySelectorAll(":scope > :not(summary)"),
                      {
                        clipPath: "inset(0% 0% 100% 0%)",
                        y: 10,
                      },
                      {
                        clipPath: "inset(0% 0% 0% 0%)",
                        y: 0,
                        duration: motionDuration.component,
                        stagger: motionDuration.micro,
                        ease: gsapEase.content,
                        clearProps: "clipPath,transform",
                        overwrite: "auto",
                      },
                    );
                  });
                };
                detail.addEventListener("toggle", openPaper);
                chapterListeners.push(() =>
                  detail.removeEventListener("toggle", openPaper),
                );
              });
            break;
          case "metodologia":
            // The reference sheet pivots onto the drafting surface. The five
            // stage rail has its own scroll state in MethodologyProgress.
            draw(".method-reference-feature", 0.06, 0.72);
            object(
              ".method-reference-feature figure",
              {
                "--assembly-yaw": "-16deg",
                "--assembly-pitch": "4deg",
                "--assembly-depth": "-70px",
              },
              {
                "--assembly-yaw": "0deg",
                "--assembly-pitch": "0deg",
                "--assembly-depth": "0px",
              },
              0,
              0.75,
            );
            break;
          case "recorrido":
            // An index line travels across the chapter tabs; the panel stays
            // under React's control when the reader changes the active tab.
            draw(".timeline-tabs", 0.02, 0.7);
            object(
              ".timeline-tabs button > span",
              {
                "--assembly-pitch": "-34deg",
                "--assembly-depth": "-20px",
              },
              { "--assembly-pitch": "0deg", "--assembly-depth": "0px" },
              0.1,
              0.5,
            );
            break;
          case "comparacion":
            // The two translucent film planes open like a material folio.
            object(
              ".portrait-sheet:not(.secondary-sheet)",
              {
                "--assembly-yaw": "-26deg",
                "--assembly-depth": "-40px",
              },
              { "--assembly-yaw": "8deg", "--assembly-depth": "20px" },
              0,
              1,
            );
            object(
              ".secondary-sheet",
              {
                "--assembly-yaw": "25deg",
                "--assembly-depth": "-60px",
              },
              { "--assembly-yaw": "-8deg", "--assembly-depth": "-5px" },
              0,
              1,
            );
            draw(".material-portrait", 0.05, 0.85);
            break;
          case "aplicaciones-futuras":
            // Four apertures expand from their own corners, like a study wall.
            draw(".future-card", 0.04, 0.65);
            object(
              ".future-card:nth-child(odd) > div:last-child",
              {
                "--assembly-yaw": "7deg",
                "--assembly-depth": "-38px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
              0.08,
              0.8,
            );
            object(
              ".future-card:nth-child(even) > div:last-child",
              {
                "--assembly-yaw": "-7deg",
                "--assembly-depth": "-38px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
              0.18,
              0.8,
            );
            break;
          case "vision-futura":
            // A horizon opens behind the existing image, then the photo plane
            // turns toward the reader without scaling past its safe gutter.
            draw(":scope > figure", 0.05, 0.8);
            object(
              ":scope > figure > .parallax-frame",
              {
                "--assembly-pitch": "12deg",
                "--assembly-depth": "-90px",
              },
              { "--assembly-pitch": "-2deg", "--assembly-depth": "0px" },
              0,
              1,
            );
            break;
          case "impacto-potencial":
            // Incomplete orbital arcs become a circular system; the ODS card
            // component retains ownership of its own connections and hinges.
            draw(".impact-photo", 0.08, 0.75);
            draw(".circular-overlay", 0.1, 0.8);
            object(
              ".circular-overlay > svg",
              {
                "--assembly-turn": "-75deg",
              },
              { "--assembly-turn": "35deg" },
              0,
              1,
            );
            camera.fromTo(
              section.querySelectorAll(".ods-network"),
              {
                "--ods-lumen": 0.15,
              },
              { "--ods-lumen": 1, duration: 0.65, ease: "none" },
              0.2,
            );
            break;
          case "gomitas":
            // A textured contour passes behind the full-frame fruit specimen.
            draw(".gummy-visual", 0, 1);
            object(
              ".gummy-label",
              {
                "--assembly-pitch": "-16deg",
                "--assembly-depth": "55px",
              },
              { "--assembly-pitch": "0deg", "--assembly-depth": "0px" },
              0.1,
              0.8,
            );
            break;
          case "equipo":
            // The archive closes as a stack; the final contact line is drawn
            // across the existing project tags rather than adding new copy.
            object(
              ".project-figure > .parallax-frame",
              {
                "--assembly-yaw": "-10deg",
                "--assembly-depth": "-65px",
              },
              { "--assembly-yaw": "0deg", "--assembly-depth": "0px" },
              0,
              0.85,
            );
            draw(".project-tags", 0.1, 0.6);
            draw(".contact-layout", 0.4, 0.6);
            break;
        }
        const active = ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: ({ isActive }) => {
            section.dataset.cinemaActive = String(isActive);
          },
        });
        section.dataset.cinemaActive = String(active.isActive);
      }

      function scan() {
        context.add(() => {
          const chapterSections = Array.from(
            document.querySelectorAll<HTMLElement>("main > section"),
          );
          chapterSections.forEach((section, index) => {
            const chapter = chapterFor(section);
            if (!seen.has(section)) {
              seen.add(section);
              sections.push(section);
              section.classList.add("cinema-section");
              section.dataset.cinemaScene = chapter.name;
              choreograph(section);
              gsap.fromTo(
                section,
                { "--scene-travel": isDesktop ? "28px" : "10px" },
                {
                  "--scene-travel": isDesktop ? "-28px" : "-10px",
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: isDesktop
                      ? motionDuration.chapter
                      : motionDuration.component,
                  },
                },
              );
              // Normalized scroll-distance handoff, not a timed transition.
              // A shared light plane enters from the preceding chapter's
              // camera direction, then hands its energy to the next one.
              const previous = chapterSections[index - 1];
              const incomingPan = previous
                ? chapterFor(previous).pan
                : chapter.pan;
              const handoff = gsap.timeline({
                scrollTrigger: {
                  trigger: section,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: isDesktop
                    ? motionDuration.chapter
                    : motionDuration.component,
                },
              });
              handoff
                .fromTo(
                  section,
                  {
                    "--handoff-light-x": `${incomingPan * (isDesktop ? 95 : 28)}px`,
                    "--handoff-light-spread": 1.15,
                    "--handoff-light-opacity": 0.25,
                  },
                  {
                    "--handoff-light-x": "0px",
                    "--handoff-light-spread": 1,
                    "--handoff-light-opacity": 0.42,
                    duration: 0.45,
                    ease: "none",
                  },
                  0,
                )
                .to(
                  section,
                  {
                    "--handoff-light-x": `${chapter.pan * (isDesktop ? -72 : -22)}px`,
                    "--handoff-light-spread": 1.1,
                    "--handoff-light-opacity": 0.12,
                    duration: 0.55,
                    ease: "none",
                  },
                  0.45,
                );
              const next = chapterSections[index + 1];
              if (next) {
                // The following chapter controls the previous chapter's light.
                // Reversing the scroll naturally brings its light back.
                gsap.fromTo(
                  section,
                  { "--scene-shade": 0 },
                  {
                    "--scene-shade": isDesktop ? 0.26 : 0.19,
                    ease: "none",
                    scrollTrigger: {
                      trigger: next,
                      start: "top 96%",
                      end: "top 22%",
                      scrub: isDesktop
                        ? motionDuration.component
                        : motionDuration.card,
                    },
                  },
                );
              }
            }

            chapter.layers.forEach((motion, layerIndex) => {
              section
                .querySelectorAll<HTMLElement>(motion.selector)
                .forEach((layer, itemIndex) => {
                  if (seen.has(layer)) return;
                  seen.add(layer);
                  layers.push(layer);
                  layer.classList.add("cinema-layer");
                  const amount = isDesktop ? 1 : 0.32;
                  const direction = itemIndex % 2 === 0 ? 1 : -1;
                  gsap.fromTo(
                    layer,
                    {
                      "--layer-enter-x": `${motion.x * amount * direction}px`,
                      "--layer-enter-y": `${motion.y * amount}px`,
                      "--layer-scale": isDesktop
                        ? motion.scale || (motion.depth ? 0.985 : 1)
                        : 1,
                      "--layer-turn": `${isDesktop ? (motion.turn || 0) * direction : 0}deg`,
                      "--layer-depth": `${isDesktop ? motion.depth || 0 : 0}px`,
                      ...(motion.reveal
                        ? { clipPath: chapter.aperture[0] }
                        : {}),
                    },
                    {
                      "--layer-enter-x": "0px",
                      "--layer-enter-y": "0px",
                      "--layer-scale": 1,
                      "--layer-turn": "0deg",
                      "--layer-depth": "0px",
                      ...(motion.reveal
                        ? {
                            clipPath: chapter.aperture[1],
                            clearProps: "clipPath",
                          }
                        : {}),
                      duration: motionDuration.chapter,
                      delay: Math.min(
                        (itemIndex + layerIndex) * motionDuration.micro,
                        motionDuration.card,
                      ),
                      ease: gsapEase.content,
                      immediateRender: false,
                      scrollTrigger: {
                        trigger: layer,
                        start: "top 95%",
                        once: true,
                      },
                    },
                  );
                  gsap.fromTo(
                    layer,
                    {
                      "--layer-x": `${motion.x * amount * direction * 0.35}px`,
                      "--layer-y": `${motion.y * amount * 0.45}px`,
                    },
                    {
                      "--layer-x": `${motion.x * amount * direction * -0.35}px`,
                      "--layer-y": `${motion.y * amount * -0.45}px`,
                      ease: "none",
                      scrollTrigger: {
                        trigger: section,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: isDesktop
                          ? motionDuration.chapter
                          : motionDuration.reveal,
                      },
                    },
                  );
                });
            });
          });

          document
            .querySelectorAll<HTMLElement>("main .cinema-heading")
            .forEach((heading) => {
              if (seen.has(heading) || heading.closest(".lightbox")) return;
              seen.add(heading);
              gsap.fromTo(
                heading,
                { "--heading-travel": isDesktop ? "12px" : "4px" },
                {
                  "--heading-travel": isDesktop ? "-12px" : "-4px",
                  ease: "none",
                  scrollTrigger: {
                    trigger: heading,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: isDesktop
                      ? motionDuration.chapter
                      : motionDuration.reveal,
                  },
                },
              );
            });

          document
            .querySelectorAll<HTMLElement>("main > section .project-photo")
            .forEach((photo, index) => {
              if (seen.has(photo) || photo.closest(".lightbox")) return;
              seen.add(photo);
              scenes.push(photo);
              photo.classList.add("cinema-photo-scene");
              const chapter = chapterFor(photo);
              // The breathing cycle is a multiple of the narrative clock;
              // phase offsets keep photographs organic without new timings.
              const duration = motionDuration.narrative * (isDesktop ? 5 : 6);
              const loop = {
                photo,
                tween: gsap.fromTo(
                  photo,
                  { "--photo-swell": isDesktop ? 0.94 : 0.96 },
                  {
                    "--photo-swell": isDesktop ? 0.975 : 0.98,
                    duration,
                    repeat: -1,
                    yoyo: true,
                    ease: organicCameraEase,
                    delay: -motionDuration.narrative * (index % 5),
                    paused: true,
                  },
                ),
                visible: false,
                release: () => {},
              };
              loops.push(loop);
              const setVisible = (value: boolean) => {
                loop.visible = value && photo.isConnected;
                if (loop.visible && !document.hidden) {
                  photo.style.willChange = "transform";
                  loop.tween.play();
                } else {
                  loop.tween.pause();
                  photo.style.removeProperty("will-change");
                }
              };
              const view = ScrollTrigger.create({
                trigger: photo,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => setVisible(true),
                onEnterBack: () => setVisible(true),
                onLeave: () => setVisible(false),
                onLeaveBack: () => setVisible(false),
              });
              setVisible(view.isActive);
              const pan = (isDesktop ? 0.6 : 0.3) * chapter.pan;
              const drift = gsap.fromTo(
                photo,
                {
                  "--photo-pan": `${-pan}%`,
                  "--photo-drift": isDesktop ? "0.3%" : "0.15%",
                },
                {
                  "--photo-pan": `${pan}%`,
                  "--photo-drift": isDesktop ? "-0.3%" : "-0.15%",
                  ease: "none",
                  scrollTrigger: {
                    trigger: photo,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: isDesktop
                      ? motionDuration.chapter
                      : motionDuration.component,
                  },
                },
              );

              // The photographic scene expands inside a reserved gutter: the
              // original never grows beyond its frame or loses its edges.
              const reveal = gsap.fromTo(
                photo,
                {
                  clipPath: chapter.aperture[0],
                },
                {
                  clipPath: chapter.aperture[1],
                  duration: motionDuration.chapter,
                  delay: (index % 3) * motionDuration.micro,
                  ease: gsapEase.editorial,
                  immediateRender: false,
                  clearProps: "clipPath",
                  scrollTrigger: {
                    trigger: photo,
                    start: "top 94%",
                    once: true,
                  },
                },
              );
              loop.release = () => {
                loop.tween.kill();
                view.kill();
                drift.scrollTrigger?.kill();
                drift.kill();
                reveal.scrollTrigger?.kill();
                reveal.kill();
                photo.style.removeProperty("will-change");
              };
            });
        });
      }

      scan();
      const observer = new MutationObserver((records) => {
        // Interactive tabs can replace a photograph. A detached scene must
        // stop its camera immediately, even before the next viewport update.
        const sceneRemoved = records.some((record) =>
          Array.from(record.removedNodes).some(
            (node) =>
              node instanceof Element &&
              (node.matches(".project-photo") ||
                node.querySelector(".project-photo")),
          ),
        );
        if (sceneRemoved) {
          for (let index = loops.length - 1; index >= 0; index -= 1) {
            const loop = loops[index];
            if (loop.photo.isConnected) continue;
            loop.release();
            loops.splice(index, 1);
          }
        }
        // Counters change text nodes each frame. Rebuild measurements only for
        // genuinely new React scenes, not text, masks or animated values.
        const sceneAdded = records.some((record) =>
          Array.from(record.addedNodes).some(
            (node) =>
              node instanceof Element &&
              (node.matches(".project-photo, .cinema-heading, section") ||
                node.querySelector(".project-photo, .cinema-heading, section")),
          ),
        );
        if (!sceneAdded) return;
        if (scanFrame) cancelAnimationFrame(scanFrame);
        scanFrame = requestAnimationFrame(() => {
          scan();
          ScrollTrigger.refresh();
        });
      });
      const main = document.querySelector("main");
      if (main) observer.observe(main, { childList: true, subtree: true });

      const tick = (seconds: number) => {
        if (!document.hidden) lenis?.raf(seconds * 1000);
      };
      if (lenis) {
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add(tick);
      }
      const visibility = () => {
        if (document.hidden) {
          lenis?.stop();
          loops.forEach(({ tween }) => tween.pause());
          scenes.forEach((photo) => photo.style.removeProperty("will-change"));
        } else {
          lenis?.start();
          loops.forEach(({ photo, tween, visible }) => {
            if (visible && photo.isConnected) {
              photo.style.willChange = "transform";
              tween.play();
            }
          });
          ScrollTrigger.refresh();
        }
      };
      document.addEventListener("visibilitychange", visibility);
      document.documentElement.dataset.scrollEngine = lenis
        ? "lenis-gsap"
        : "native-gsap";
      ScrollTrigger.refresh();
      document.fonts.ready.then(() => {
        if (!disposed) ScrollTrigger.refresh();
      });

      dispose = () => {
        observer.disconnect();
        cancelAnimationFrame(scanFrame);
        chapterListeners.forEach((remove) => remove());
        document.removeEventListener("visibilitychange", visibility);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        loops.forEach(({ release }) => release());
        context.revert();
        sections.forEach((section) => {
          section.classList.remove("cinema-section");
          delete section.dataset.cinemaScene;
          delete section.dataset.cinemaActive;
        });
        scenes.forEach((photo) => {
          photo.classList.remove("cinema-photo-scene");
          photo.style.removeProperty("will-change");
        });
        layers.forEach((layer) => layer.classList.remove("cinema-layer"));
        assemblies.forEach((assembly) =>
          assembly.classList.remove("cinema-assembly"),
        );
        delete document.documentElement.dataset.scrollEngine;
      };
    }

    void start();
    return () => {
      disposed = true;
      dispose();
    };
  }, [desktop, paused, reduced]);

  return null;
}
