import Image from "next/image";
/** Emblem supplied by the project, with its name adapted to BIOCRAB as requested. */
export function Brand({
  hero = false,
  link = true,
}: {
  hero?: boolean;
  link?: boolean;
}) {
  const content = (
    <>
      <Image
        src="/images/biocrab-logo-adaptado.png"
        alt="Logo BioCrab: gota azul, hoja verde y motivo rojo"
        width={1254}
        height={1254}
        className="official-brand-image"
        sizes={hero ? "(max-width:650px) 150px, 200px" : "72px"}
        priority={hero}
      />
      {!hero && (
        <span className="brand-wordmark">
          BioCrab <small>BIOMATERIALES</small>
        </span>
      )}
    </>
  );
  const className = `biocrab-brand${hero ? " biocrab-brand-hero" : ""}`;
  return link ? (
    <a
      href="#inicio"
      aria-label={hero ? "BioCrab, inicio" : "BioCrab Biomateriales, inicio"}
      className={className}
    >
      {content}
    </a>
  ) : (
    <span className={className}>{content}</span>
  );
}
