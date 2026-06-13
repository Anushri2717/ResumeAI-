import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../context/ResumeContext';
import TemplateModern from './TemplateModern';
import TemplateClassic from './TemplateClassic';
import TemplateCreative from './TemplateCreative';

const TEMPLATES = { modern: TemplateModern, classic: TemplateClassic, creative: TemplateCreative };

export default function ResumePreview() {
  const { resumeData } = useResume();
  const printRef = useRef();
  const Template = TEMPLATES[resumeData.template] || TemplateModern;
  const handlePrint = useReactToPrint({ content: () => printRef.current });

  return (
    <div className="preview-wrap">
      <div className="preview-toolbar">
        <span>Preview — {resumeData.template} template</span>
        <button className="btn btn-outline btn-sm" onClick={handlePrint}>🖨 Print</button>
      </div>
      <div className="preview-page" ref={printRef}>
        <Template data={resumeData} />
      </div>
    </div>
  );
}