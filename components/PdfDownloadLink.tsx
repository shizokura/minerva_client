import { useEffect, useRef } from 'react';
import { Document, pdf, renderToStream } from '@react-pdf/renderer';

interface PdfDownloadLinkProps {
 document: Document;
 fileName: string;
}

const PdfDownloadLink: React.FC<PdfDownloadLinkProps> = ({ document, fileName }) => {
 const linkRef = useRef<HTMLAnchorElement>(null);

 useEffect(() => {
    (async () => {
      const pdfDoc = await pdf(<Document />).toBlob();
      const url = URL.createObjectURL(pdfDoc);
      if (linkRef.current) {
        linkRef.current.href = url;
        linkRef.current.download = fileName;
      }
    })();
 }, []);

 return <a ref={linkRef}>Download PDF</a>;
};

export default PdfDownloadLink;