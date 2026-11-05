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
import "./scroll-cinema.css";

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
        const context = gsap.context(() => {
          const words = heading.querySelectorAll<HTMLElement>(".cinema-word");
          gsap.fromTo(
            words,
            {
              yPercent: 112,
              rotateX: desktop ? -28 : 0,
              scale: 0.94,
            },
            {
              yPercent: 0,
              rotateX: 0,
              scale: 1,
              duration: 1.05,
              stagger: { each: desktop ? 0.055 : 0.04, amount: 0.4 },
              ease: "power3.out",
              immediateRender: false,
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
  const [desktop, setDesktop] = useState(false);

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
    if (reduced || paused) {
      document.documentElement.dataset.scrollEngine = "still";
      return () => {
        delete document.documentElement.dataset.scrollEngine;
      };
    }
    let disposed = false;
    let dispose = () => {};

    async function start() {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (disposed) return;
      gsap.registerPlugin(ScrollTrigger);
      const lenis = desktop
        ? new (await import("lenis")).default({
            lerp: 0.085,
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
      const loops: { tween: gsap.core.Tween; visible: boolean }[] = [];
      const context = gsap.context(() => {});
      let scanFrame = 0;

      function scan() {
        context.add(() => {
          document
            .querySelectorAll<HTMLElement>("main > section")
            .forEach((section, index) => {
              if (seen.has(section)) return;
              seen.add(section);
              sections.push(section);
              section.classList.add("cinema-section");
              section.dataset.cinemaScene = String(index % 4);
              gsap.fromTo(
                section,
                { "--scene-travel": "-12%", "--scene-luminance": 0.12 },
                {
                  "--scene-travel": "12%",
                  "--scene-luminance": 0.55,
                  ease: "none",
                  scrollTrigger: {
                    trigger: section,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: desktop ? 1.2 : 0.6,
                  },
                },
              );
            });

          document
            .querySelectorAll<HTMLElement>("main .cinema-heading")
            .forEach((heading) => {
              if (seen.has(heading) || heading.closest(".lightbox")) return;
              seen.add(heading);
              gsap.fromTo(
                heading,
                { "--heading-travel": desktop ? "16px" : "7px" },
                {
                  "--heading-travel": desktop ? "-16px" : "-7px",
                  ease: "none",
                  scrollTrigger: {
                    trigger: heading,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: desktop ? 0.9 : 0.4,
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
              const duration = (desktop ? 11 : 13) + (index % 4);
              const loop = {
                tween: gsap.fromTo(
                  photo,
                  { "--photo-swell": desktop ? 0.94 : 0.96 },
                  {
                    "--photo-swell": desktop ? 0.975 : 0.99,
                    duration,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    paused: true,
                  },
                ),
                visible: false,
              };
              loops.push(loop);
              const setVisible = (value: boolean) => {
                loop.visible = value;
                if (value && !document.hidden) {
                  photo.style.willChange = "transform";
                  loop.tween.play();
                } else {
                  loop.tween.pause();
                  photo.style.removeProperty("will-change");
                }
              };
              ScrollTrigger.create({
                trigger: photo,
                start: "top bottom",
                end: "bottom top",
                onEnter: () => setVisible(true),
                onEnterBack: () => setVisible(true),
                onLeave: () => setVisible(false),
                onLeaveBack: () => setVisible(false),
              });
              gsap.fromTo(
                photo,
                { "--photo-drift": desktop ? "0.6%" : "0.3%" },
                {
                  "--photo-drift": desktop ? "-0.6%" : "-0.3%",
                  ease: "none",
                  scrollTrigger: {
                    trigger: photo,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: desktop ? 1.1 : 0.5,
                  },
                },
              );

              // The photographic scene expands inside a reserved gutter: the
              // original never grows beyond its frame or loses its edges.
              const section = photo.closest("section")?.id;
              const aperture =
                section === "inicio"
                  ? "inset(0% 10% 0% 10% round 18px)"
                  : section === "impacto-potencial" ||
                      section === "vision-futura"
                    ? "inset(10% 5% 10% 5% round 30px)"
                    : section === "galeria"
                      ? "inset(0% 0% 10% 0% round 18px)"
                      : "inset(7% 0% 7% 0% round 14px)";
              gsap.fromTo(
                photo,
                {
                  clipPath: aperture,
                },
                {
                  clipPath: "inset(0% 0% 0% 0% round 0px)",
                  duration: desktop ? 1.4 : 1.1,
                  ease: "power3.inOut",
                  immediateRender: false,
                  scrollTrigger: {
                    trigger: photo,
                    start: "top 94%",
                    once: true,
                  },
                },
              );
            });
        });
      }

      scan();
      const observer = new MutationObserver((records) => {
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
          loops.forEach(({ tween, visible }) => {
            if (visible) {
              const photo = tween.targets()[0] as HTMLElement | undefined;
              if (photo) photo.style.willChange = "transform";
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
        document.removeEventListener("visibilitychange", visibility);
        gsap.ticker.remove(tick);
        lenis?.destroy();
        context.revert();
        sections.forEach((section) => {
          section.classList.remove("cinema-section");
          delete section.dataset.cinemaScene;
        });
        scenes.forEach((photo) => {
          photo.classList.remove("cinema-photo-scene");
          photo.style.removeProperty("will-change");
        });
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
