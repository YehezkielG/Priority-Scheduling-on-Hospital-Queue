import React from 'react';

const RealLifeApplications = ({ language }) => {
  const content = {
    en: {
      title: "Real-Life Applications of Priority Scheduling",
      introduction: "Priority scheduling is not just a theoretical concept but a practical approach used in many systems we interact with daily:",
      applications: [
        {
          title: "Operating Systems",
          description: "Modern operating systems use priority scheduling to manage system processes. Critical system services receive higher priority than user applications."
        },
        {
          title: "Hospital Emergency Rooms",
          description: "Patients are treated based on the severity of their condition rather than arrival time, using triage systems that assign priorities."
        },
        {
          title: "Traffic Management",
          description: "Emergency vehicles get priority at traffic lights. Smart traffic systems adjust signal timing based on traffic volume and congestion."
        },
        {
          title: "Network Routers",
          description: "Voice and video packets receive higher priority than email or file downloads to ensure smooth real-time communication."
        },
        {
          title: "Manufacturing",
          description: "Production lines prioritize urgent orders or critical components, especially in just-in-time manufacturing environments."
        }
      ],
      caseStudy: {
        title: "Case Study: Smart Traffic Control System",
        description: "A real-world implementation of priority scheduling in action:",
        points: [
          "Emergency vehicles (Priority 1): Immediate green light",
          "Public transportation (Priority 2): Extended green light duration",
          "Main road traffic (Priority 3): Standard green light duration",
          "Side street traffic (Priority 4): Shorter green light duration",
          "Pedestrian crossings (Priority 5): Activated only when requested"
        ]
      }
    },
    id: {
      title: "Aplikasi Kehidupan Nyata dari Penjadwalan Prioritas",
      introduction: "Penjadwalan prioritas bukan hanya konsep teoritis tetapi pendekatan praktis yang digunakan dalam banyak sistem sehari-hari:",
      applications: [
        {
          title: "Sistem Operasi",
          description: "Sistem operasi modern menggunakan penjadwalan prioritas untuk mengelola proses sistem. Layanan sistem kritis menerima prioritas lebih tinggi daripada aplikasi pengguna."
        },
        {
          title: "Unit Gawat Darurat Rumah Sakit",
          description: "Pasien dirawat berdasarkan tingkat keparahan kondisi mereka daripada waktu kedatangan, menggunakan sistem triase yang menetapkan prioritas."
        },
        {
          title: "Manajemen Lalu Lintas",
          description: "Kendaraan darurat mendapat prioritas di lampu lalu lintas. Sistem lalu lintas pintar menyesuaikan waktu sinyal berdasarkan volume lalu lintas dan kemacetan."
        },
        {
          title: "Router Jaringan",
          description: "Paket suara dan video menerima prioritas lebih tinggi daripada email atau unduhan file untuk memastikan komunikasi real-time yang lancar."
        },
        {
          title: "Manufaktur",
          description: "Lini produksi memprioritaskan pesanan mendesak atau komponen penting, terutama dalam lingkungan manufaktur just-in-time."
        }
      ],
      caseStudy: {
        title: "Studi Kasus: Sistem Kontrol Lalu Lintas Pintar",
        description: "Implementasi dunia nyata dari penjadwalan prioritas dalam tindakan:",
        points: [
          "Kendaraan darurat (Prioritas 1): Lampu hijau segera",
          "Transportasi umum (Prioritas 2): Durasi lampu hijau diperpanjang",
          "Lalu lintas jalan utama (Prioritas 3): Durasi lampu hijau standar",
          "Lalu lintas jalan samping (Prioritas 4): Durasi lampu hijau lebih pendek",
          "Penyeberangan pejalan kaki (Prioritas 5): Diaktifkan hanya ketika diminta"
        ]
      }
    }
  };

  const t = content[language || 'en'];

  return (
    <div className="real-life-applications">
      <h2 className="text-xl font-bold mb-3">{t.title}</h2>
      <p className="mb-4">{t.introduction}</p>
      
      <div className="applications-grid">
        {t.applications.map((app, index) => (
          <div key={index} className="application-card p-3 mb-3 border rounded">
            <h3 className="font-bold">{app.title}</h3>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
      
      <div className="case-study mt-4 p-3 border rounded">
        <h3 className="font-bold mb-2">{t.caseStudy.title}</h3>
        <p>{t.caseStudy.description}</p>
        <ul className="mt-2">
          {t.caseStudy.points.map((point, index) => (
            <li key={index} className="mb-1">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RealLifeApplications;