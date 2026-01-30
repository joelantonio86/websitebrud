import { useRef } from 'react';
import useCounter from '@/hooks/useCounter';

interface StatItem {
  value: number;
  label: string;
  icon: string;
  colorClass: string;
}

const Stats: React.FC = () => {
  const statsRef = useRef<HTMLElement>(null);
  
  const stats: StatItem[] = [
    { value: 24, label: 'BANDAS', icon: 'fas fa-users', colorClass: 'stat-yellow' },
    { value: 811, label: 'COMPONENTES', icon: 'fas fa-user-friends', colorClass: 'stat-blue' },
    { value: 35, label: 'ANOS', icon: 'fas fa-calendar-alt', colorClass: 'stat-yellow' },
    { value: 133, label: 'MÚSICAS', icon: 'fas fa-music', colorClass: 'stat-blue' },
  ];

  const bandasCount = useCounter({ target: stats[0].value, duration: 2000, startOnView: true, parentRef: statsRef });
  const componentesCount = useCounter({ target: stats[1].value, duration: 2000, startOnView: true, parentRef: statsRef });
  const anosCount = useCounter({ target: stats[2].value, duration: 2000, startOnView: true, parentRef: statsRef });
  const musicasCount = useCounter({ target: stats[3].value, duration: 2000, startOnView: true, parentRef: statsRef });

  const counts = [bandasCount, componentesCount, anosCount, musicasCount];

  return (
    <section className="stats section" ref={statsRef}>
      <div className="container">
        <div className="stats-header">
          <h2 className="stats-title">NOSSOS NÚMEROS</h2>
        </div>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className={`stat-item ${stat.colorClass}`}>
              <div className="stat-icon">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-number" data-target={stat.value}>
                {counts[index]}
              </div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
