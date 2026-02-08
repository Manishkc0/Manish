import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ModelViewer from '@/components/ui/mymodel';

export default function ModelPage() {
  const navigate = useNavigate();

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <ModelViewer 
        sketchfabModelUrl="/mymdels/scene.gltf"
        isFullScreen={true}
      />
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 50,
          padding: '10px 16px',
          background: 'rgba(211, 119, 43, 0.9)',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '14px',
          fontWeight: '500',
          transition: 'background 0.3s'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.background = 'rgba(211, 119, 43, 1)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.background = 'rgba(211, 119, 43, 0.9)';
        }}
      >
        <ArrowLeft size={18} />
        Back to Portfolio
      </button>
    </div>
  );
}
