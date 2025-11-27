import { useMemo, useState } from 'react';
import {
  FiUploadCloud,
  FiCheckCircle,
  FiUsers,
  FiMessageCircle,
  FiArrowRight,
  FiTrendingUp,
  FiShield,
} from 'react-icons/fi';
import './App.css';

const App = () => {
  const [studentForm, setStudentForm] = useState({
    title: '',
    abstract: '',
    tech: '',
  });

  const stats = useMemo(
    () => [
      { label: 'FYPS SUBMITTED', value: '184+', icon: <FiUploadCloud /> },
      { label: 'SUPERVISORS', value: '32', icon: <FiUsers /> },
      { label: 'AVG. TURNAROUND', value: '48h', icon: <FiTrendingUp /> },
      { label: 'APPROVAL RATE', value: '72%', icon: <FiCheckCircle /> },
    ],
    []
  );

  const submissions = useMemo(
    () => [
      {
        title: 'AI-Powered Attendance',
        student: 'Ayesha Khan',
        status: 'Under Review',
        supervisor: 'Dr. Salman',
        updated: '2h ago',
      },
      {
        title: 'Smart Waste Bins',
        student: 'Hassan Malik',
        status: 'Pending',
        supervisor: 'Dr. Adeel',
        updated: '6h ago',
      },
      {
        title: 'Health Insight App',
        student: 'Rida Sarwar',
        status: 'Accepted',
        supervisor: 'Prof. Moiz',
        updated: '1d ago',
      },
    ],
    []
  );

  const timeline = useMemo(
    () => [
      {
        title: 'Upload Draft',
        desc: 'Students submit proposal, abstract, and documentation in one step.',
      },
      {
        title: 'Supervisor Review',
        desc: 'Automated routing ensures assigned supervisors get instant alerts.',
      },
      {
        title: 'Decision & Feedback',
        desc: 'Track approvals, rejections, and remarks with audit-ready history.',
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        name: 'Dr. Farah Mazhar',
        role: 'FYP Coordinator',
        quote:
          'Review cycles dropped from weeks to days. Every stakeholder finally sees the same single source of truth.',
      },
      {
        name: 'Osman Rafi',
        role: 'Final Year Student',
        quote:
          'Uploading iterations, receiving remarks, and resubmitting takes minutes. No more chasing signatures across campus.',
      },
    ],
    []
  );

  const handleStudentSubmit = (event) => {
    event.preventDefault();
    window.alert(
      'This demo form only showcases the UI. Connect it to the backend API to upload real FYPS.'
    );
  };

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg glass-card rounded-4 px-4 py-3 mb-4">
        <a className="navbar-brand fw-bold text-white" href="#hero">
          FYP Evaluation Portal
        </a>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navContent">
          <div className="d-flex gap-3">
            <button className="btn btn-outline-light px-4">Supervisor Login</button>
            <button className="btn btn-primary px-4">Student Login</button>
          </div>
        </div>
      </nav>

      <main>
        <section id="hero" className="hero-section glass-card rounded-5 p-5 mb-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span className="badge bg-gradient text-uppercase small fw-semibold mb-3">
                Transparent FYP lifecycle
              </span>
              <h1 className="display-5 fw-bold text-white mb-4">
                Modern workflows for students and supervisors.
              </h1>
              <p className="lead text-white-50 mb-4">
                Upload FYPS, assign supervisors, capture remarks, and drive faster approvals with a
                single collaborative workspace.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-primary btn-lg d-flex align-items-center gap-2">
                  Get Started
                  <FiArrowRight />
                </button>
                <button className="btn btn-outline-light btn-lg">Book a Demo</button>
              </div>
              <div className="d-flex align-items-center gap-3 mt-4 text-white-50 small">
                <FiShield />
                <span>Secure uploads and auditable evaluations</span>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="preview-panel rounded-4 p-4">
                <h5 className="text-white-50">Dashboard Preview</h5>
                {submissions.map((item) => (
                  <div key={item.title} className="preview-row">
                    <div>
                      <p className="mb-1 text-white fw-semibold">{item.title}</p>
                      <small className="text-white-50">{item.student}</small>
                    </div>
                    <div className="text-end">
                      <span className={`status-pill status-${item.status.replace(' ', '').toLowerCase()}`}>
                        {item.status}
                      </span>
                      <p className="text-white-50 small mb-0">{item.updated}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="stats-grid mb-5">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card glass-card rounded-4 p-4">
              <div className="icon-pill">{stat.icon}</div>
              <p className="stat-value">{stat.value}</p>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="row g-4 mb-5">
          <div className="col-lg-6">
            <div className="glass-card rounded-4 p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-pill">
                  <FiUploadCloud />
                </div>
                <div>
                  <h4 className="text-white mb-1">Student Upload Workspace</h4>
                  <p className="text-white-50 small mb-0">
                    Attach docs, tag technologies, and assign supervisors in one go.
                  </p>
                </div>
              </div>
              <form onSubmit={handleStudentSubmit} className="student-form">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Project Title
                  </label>
                  <input
                    id="title"
                    className="form-control form-control-lg"
                    value={studentForm.title}
                    onChange={(e) => setStudentForm({ ...studentForm, title: e.target.value })}
                    placeholder="e.g. Intelligent Campus Navigation"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="abstract" className="form-label">
                    Abstract
                  </label>
                  <textarea
                    id="abstract"
                    className="form-control"
                    rows={4}
                    value={studentForm.abstract}
                    onChange={(e) => setStudentForm({ ...studentForm, abstract: e.target.value })}
                    placeholder="Highlight the problem, approach, and expected impact."
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tech" className="form-label">
                    Technology Stack
                  </label>
                  <input
                    id="tech"
                    className="form-control"
                    value={studentForm.tech}
                    onChange={(e) => setStudentForm({ ...studentForm, tech: e.target.value })}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 py-3">
                  Preview Submission
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="glass-card rounded-4 p-4 h-100">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-pill">
                  <FiMessageCircle />
                </div>
                <div>
                  <h4 className="text-white mb-1">Supervisor Review Board</h4>
                  <p className="text-white-50 small mb-0">
                    Centralized remarks, decisions, and version tracking.
                  </p>
                </div>
              </div>
              <div className="review-list">
                {submissions.map((item) => (
                  <div key={item.title} className="review-row">
                    <div>
                      <p className="text-white fw-semibold mb-0">{item.title}</p>
                      <small className="text-white-50">By {item.student}</small>
                    </div>
                    <div className="text-end">
                      <span className={`badge rounded-pill me-2 status-${item.status.replace(' ', '').toLowerCase()}`}>
                        {item.status}
                      </span>
                      <p className="text-white-50 small mb-0">{item.supervisor}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="glass-card rounded-5 p-5 mb-5">
          <div className="row g-4">
            {timeline.map((step) => (
              <div key={step.title} className="col-md-4">
                <div className="timeline-step">
                  <span className="step-number">{timeline.indexOf(step) + 1}</span>
                  <h5 className="text-white">{step.title}</h5>
                  <p className="text-white-50">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="testimonials mb-5">
          {testimonials.map((item) => (
            <div key={item.name} className="glass-card rounded-4 p-4">
              <p className="text-white-50 mb-4">“{item.quote}”</p>
              <p className="text-white fw-semibold mb-0">{item.name}</p>
              <small className="text-white-50">{item.role}</small>
            </div>
          ))}
        </section>
      </main>

      <footer className="glass-card rounded-4 p-4 text-center text-white-50">
        © {new Date().getFullYear()} FYP Evaluation Portal · Crafted with React, Bootstrap and MongoDB
      </footer>
    </div>
  );
};

export default App;
