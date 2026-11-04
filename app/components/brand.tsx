import Image from "next/image";

/** Original BioCrab wordmark. Never substitutes an image carrying another identity. */
export function Brand({
  hero = false,
  link = true,
}: {
  hero?: boolean;
  link?: boolean;
}) {
  const image = (
    <Image
      src="/biocrab-wordmark.svg"
      alt="BioCrab"
      width={430}
      height={108}
      sizes={hero ? "(max-width: 760px) 82vw, 430px" : "176px"}
      priority={hero}
      style={{ display: "block", width: "100%", height: "auto" }}
    />
  );
  const style = {
    display: "inline-block",
    width: hero ? "min(82vw, 430px)" : "176px",
    maxWidth: "100%",
    flexShrink: 0,
    borderRadius: "10px",
    verticalAlign: "middle",
  } as const;

  return link ? (
    <a
      className={`biocrab-brand${hero ? " biocrab-brand-hero" : ""}`}
      href="#inicio"
      aria-label="BioCrab, inicio"
      style={style}
    >
      {image}
    </a>
  ) : (
    <span
      className={`biocrab-brand${hero ? " biocrab-brand-hero" : ""}`}
      style={style}
    >
      {image}
    </span>
  );
}
