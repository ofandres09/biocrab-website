import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'BioCrab — La naturaleza tiene la fórmula', description: 'Investigamos biopelículas a base de almidón de yuca y quitosano de exoesqueletos de cangrejo para la conservación de alimentos.', openGraph: { title: 'BioCrab | Ciencia que vuelve a la naturaleza', description: 'Biomateriales, conservación de alimentos y economía circular.', locale: 'es_ES', type: 'website' } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="es"><body>{children}</body></html>; }
