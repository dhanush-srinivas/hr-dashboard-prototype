import React, { useEffect, useMemo, useState } from 'react'

const CONFIG = {
  endpointUrl:
    (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SHEETS_WEBAPP_URL || import.meta.env.VITE_N8N_WEBHOOK_URL)) ||
    (typeof document !== 'undefined' && (document.querySelector('meta[name="sheets-webapp"]')?.content || document.querySelector('meta[name="n8n-webhook"]')?.content)) ||
    '',
}

const initialDirectory = [
  { id: 'E1001', name: 'Jane Smith', role: 'Software Engineer', department: 'Engineering', manager: 'Laura Chen' },
  { id: 'E1002', name: 'John Doe', role: 'Product Manager', department: 'Product', manager: 'Akash Patel' },
  { id: 'E1003', name: 'Alice Brown', role: 'HR Specialist', department: 'Human Resources', manager: 'Sonia Rivera' },
  { id: 'E1004', name: 'Michael Green', role: 'Sales Representative', department: 'Sales', manager: 'Nora Alvarez' },
  { id: 'E1005', name: 'Sarah Connor', role: 'Data Analyst', department: 'Analytics', manager: 'Vikram Singh' },
  { id: 'E1006', name: 'Peter Parker', role: 'UX Designer', department: 'Design', manager: 'Dana Ortiz' },
]

const initialEmployees = [
  { name: 'Jane Smith', role: 'Software Engineer', exitDate: '2024-07-15', status: 'in-progress', progress: 70, tasks: ['file-alt', 'laptop', 'key'] },
  { name: 'John Doe', role: 'Product Manager', exitDate: '2024-06-30', status: 'overdue', progress: 40, tasks: ['file-alt', 'check'] },
  { name: 'Alice Brown', role: 'HR Specialist', exitDate: '2024-08-01', status: 'upcoming', progress: 10, tasks: ['file-alt', 'key'] },
  { name: 'Michael Green', role: 'Sales Representative', exitDate: '2024-07-20', status: 'completed', progress: 100, tasks: ['file-alt', 'laptop'] },
  { name: 'Sarah Connor', role: 'Data Analyst', exitDate: '2024-07-25', status: 'in-progress', progress: 55, tasks: ['file-alt', 'check'] },
  { name: 'Peter Parker', role: 'UX Designer', exitDate: '2024-08-10', status: 'upcoming', progress: 0, tasks: ['file-alt'] },
]

const alertsDefault = [
  'Overdue Asset: Laptop Return for John Doe. Action required immediately.',
  'Pending Revocation: Access Card for Alice Brown. Verify status.',
  'Final Paycheck Approval: Michael Green. Check for discrepancies.',
]

const kpisDefault = [
  { number: 15, label: 'DAYS', subtitle: 'AVG COMPLETION TIME' },
  { number: 25, label: 'OFFBOARDINGS', subtitle: 'THIS MONTH' },
]

function Icon({ name, title }) {
  return <i className={`fas fa-${name}`} title={title || ''}></i>
}

function StatusBadge({ status }) {
  const map = { 'in-progress': 'In Progress', overdue: 'Overdue', upcoming: 'Upcoming', completed: 'Completed' }
  return <span className={`status-badge ${status}`}>{map[status] || status}</span>
}

function Toast({ message, onHide }) {
  useEffect(() => {
    if (!message) return
    const id = setTimeout(onHide, 3000)
    return () => clearTimeout(id)
  }, [message])
  return (
    <div id="toast" className={`toast ${message ? 'show' : ''}`}>
      <div className="toast-content">
        <i className="fas fa-check-circle"></i>
        <span>{message || ''}</span>
      </div>
    </div>
  )
}

function RightSidebar({ employees, setFilter, alerts = alertsDefault, kpis = kpisDefault }) {
  const total = employees.length || 1
  const counts = useMemo(() => employees.reduce((a, e) => ((a[e.status] = (a[e.status] || 0) + 1), a), {}), [employees])
  const pct = (key) => Math.round(((counts[key] || 0) / total) * 100)
  return (
    <aside className="right-sidebar">
      <div className="panel task-status-panel">
        <h3>Task Status Overview</h3>
        {['completed', 'in-progress', 'overdue'].map((key) => (
          <div className="status-segment" key={key} onClick={() => setFilter(key)}>
            <div className="status-info">
              {key === 'completed' && <i className="fas fa-check-circle" />}
              {key === 'in-progress' && <i className="fas fa-clock" />}
              {key === 'overdue' && <i className="fas fa-times-circle" />}
              <span>{key === 'in-progress' ? 'In Progress' : key.charAt(0).toUpperCase() + key.slice(1)}</span>
              <span className="percentage">{pct(key)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${pct(key)}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="panel alerts-panel">
        <h3>Alerts & Notifications</h3>
        <div id="alerts-list">
          {alerts.map((t, i) => (
            <div className="alert-item" key={i}>
              <Icon name="exclamation-triangle" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="panel kpi-panel">
        <h3>Quick Insights KPIs</h3>
        <div id="kpi-container">
          {kpis.map((k, i) => (
            <div className="kpi-item" key={i}>
              <div className="kpi-number">{k.number}</div>
              <div className="kpi-label">{k.label}</div>
              <div className="kpi-subtitle">{k.subtitle}</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

function InitiateForm({ onSubmitted, directory = initialDirectory, setToast }) {
  const [useDirectory, setUseDirectory] = useState(true)
  const [form, setForm] = useState({
    empName: '',
    empId: '',
    jobTitle: '',
    department: '',
    managerName: '',
    offType: 'Resignation',
    exitDate: '',
    reason: 'Personal',
    noticeDays: '',
    offNotes: '',
    comments: '',
    teams: ['HR', 'IT', 'Payroll', 'Manager'],
  })
  const [review, setReview] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name === 'teams') {
      setForm((s) => ({ ...s, teams: checked ? [...new Set([...s.teams, value])] : s.teams.filter((t) => t !== value) }))
    } else {
      setForm((s) => ({ ...s, [name]: value }))
    }
  }
  const onNameChange = (e) => {
    const value = e.target.value
    setForm((s) => ({ ...s, empName: value }))
    if (useDirectory) {
      const m = directory.find((d) => d.name.toLowerCase() === value.toLowerCase())
      if (m) setForm((s) => ({ ...s, empId: m.id, jobTitle: m.role, department: m.department, managerName: m.manager }))
    }
  }

  const submit = async () => {
    const payload = {
      employeeName: form.empName,
      employeeId: form.empId,
      jobTitle: form.jobTitle,
      department: form.department,
      managerName: form.managerName,
      offboardingType: form.offType,
      exitDate: form.exitDate,
      reason: form.reason,
      noticeDays: form.noticeDays,
      offboardingNotes: form.offNotes,
      comments: form.comments,
      notifyTeams: form.teams.join(','),
      submittedAt: new Date().toISOString(),
      source: 'hr-dashboard-react',
    }
    if (!CONFIG.endpointUrl) {
      setToast('Endpoint not configured')
      return
    }
    // If endpoint is a Google Apps Script web app, avoid CORS by HTML form POST to hidden iframe
    const isAppsScript = /script\.googleusercontent\.com|script\.google\.com/.test(CONFIG.endpointUrl)
    if (isAppsScript) {
      try {
        submitViaHiddenForm(CONFIG.endpointUrl, payload)
        setToast('Offboarding request submitted')
        onSubmitted && onSubmitted()
        return
      } catch (e) {
        console.error(e)
        setToast('Submit failed (form).')
        return
      }
    }
    try {
      const body = new URLSearchParams(payload).toString()
      const res = await fetch(CONFIG.endpointUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body,
      })
      if (!res.ok) {
        const text = await res.text().catch(() => '')
        throw new Error('HTTP ' + res.status + (text ? ' - ' + text : ''))
      }
      setToast('Offboarding request submitted')
      onSubmitted && onSubmitted()
    } catch (e) {
      console.error(e)
      setToast('Submit failed.')
    }
  }

  function submitViaHiddenForm(url, data) {
    let iframe = document.getElementById('hidden_submit_iframe')
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      iframe.name = 'hidden_submit_iframe'
      iframe.id = 'hidden_submit_iframe'
      document.body.appendChild(iframe)
    }
    const form = document.createElement('form')
    form.style.display = 'none'
    form.method = 'POST'
    form.action = url
    form.target = 'hidden_submit_iframe'
    Object.entries(data).forEach(([k, v]) => {
      const input = document.createElement('input')
      input.type = 'hidden'
      input.name = k
      input.value = Array.isArray(v) ? v.join(',') : (v ?? '')
      form.appendChild(input)
    })
    document.body.appendChild(form)
    form.submit()
    setTimeout(() => form.remove(), 1000)
  }

  return (
    <div className="screen active" id="initiate-offboarding-screen">
      <h2>Initiate Offboarding</h2>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-grid">
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="empName">Employee Name</label>
              <label className="toggle">
                <input type="checkbox" checked={useDirectory} onChange={(e) => setUseDirectory(e.target.checked)} /> Use
                directory suggestions
              </label>
            </div>
            <input
              id="empName"
              name="empName"
              value={form.empName}
              onChange={onNameChange}
              list={useDirectory ? 'employee-datalist' : undefined}
              placeholder="Start typing or type freely"
            />
            <datalist id="employee-datalist">
              {directory.map((d) => (
                <option key={d.id} value={d.name} label={`${d.name} • ${d.role}`} />
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="empId">Employee ID</label>
            <input id="empId" name="empId" value={form.empId} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="jobTitle">Job Title / Role</label>
            <input id="jobTitle" name="jobTitle" value={form.jobTitle} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="department">Department</label>
            <input id="department" name="department" value={form.department} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="managerName">Manager / Supervisor Name</label>
            <input id="managerName" name="managerName" value={form.managerName} onChange={onChange} />
          </div>

          <div className="form-group">
            <label htmlFor="offType">Type of Offboarding</label>
            <select id="offType" name="offType" value={form.offType} onChange={onChange}>
              {['Resignation', 'Termination', 'Retirement', 'Contract End', 'Other'].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="exitDate">Last Working Day / Exit Date</label>
            <input id="exitDate" name="exitDate" type="date" value={form.exitDate} onChange={onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Leaving</label>
            <select id="reason" name="reason" value={form.reason} onChange={onChange}>
              {['Personal', 'Career Change', 'Performance', 'Layoff', 'Other'].map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="noticeDays">Notice Period Served (days)</label>
            <input id="noticeDays" name="noticeDays" type="number" min="0" value={form.noticeDays} onChange={onChange} />
          </div>

          <div className="form-group full">
            <label htmlFor="offNotes">Offboarding Notes</label>
            <textarea id="offNotes" name="offNotes" rows="3" value={form.offNotes} onChange={onChange}></textarea>
          </div>
          <div className="form-group full">
            <label htmlFor="comments">Additional Comments / Instructions</label>
            <textarea id="comments" name="comments" rows="3" value={form.comments} onChange={onChange}></textarea>
          </div>

          <div className="form-group full">
            <label>Teams to Notify</label>
            <div className="checkbox-row">
              {['HR', 'IT', 'Payroll', 'Facilities', 'Manager'].map((t) => (
                <label key={t}>
                  <input type="checkbox" name="teams" value={t} checked={form.teams.includes(t)} onChange={onChange} /> {t}
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="form-actions">
          {!review && (
            <button type="button" className="primary" onClick={() => setReview(true)}>
              Review Summary
            </button>
          )}
          {review && (
            <>
              <button type="button" className="primary" onClick={submit}>
                Confirm & Submit
              </button>
              <button type="button" className="secondary" onClick={() => setReview(false)}>
                Back
              </button>
            </>
          )}
          <button
            type="reset"
            className="secondary"
            onClick={() =>
              setForm({
                empName: '',
                empId: '',
                jobTitle: '',
                department: '',
                managerName: '',
                offType: 'Resignation',
                exitDate: '',
                reason: 'Personal',
                noticeDays: '',
                offNotes: '',
                comments: '',
                teams: ['HR', 'IT', 'Payroll', 'Manager'],
              })
            }
          >
            Clear
          </button>
        </div>
        {review && (
          <div id="summary-panel" className="summary-panel">
            <h3>Confirm Offboarding Details</h3>
            <div className="summary-content">
              {[
                ['Employee Name', form.empName],
                ['Employee ID', form.empId],
                ['Job Title', form.jobTitle],
                ['Department', form.department],
                ['Manager', form.managerName],
                ['Offboarding Type', form.offType],
                ['Exit Date', form.exitDate],
                ['Reason', form.reason],
                ['Notice Period (days)', form.noticeDays],
                ['Offboarding Notes', form.offNotes],
                ['Additional Comments', form.comments],
                ['Notify Teams', form.teams.join(', ')],
              ].map(([k, v]) => (
                <div key={k}>
                  <strong>{k}:</strong> {v || '-'}
                </div>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  )
}

function Dashboard({ employees, filter, setFilter, onRefresh, onSendReminder }) {
  const filtered = employees.filter((e) => (!filter || filter === 'all' ? true : e.status === filter))
  return (
    <div className="screen active" id="dashboard-screen">
      <div className="section-header">
        <h2>Employee Offboarding List</h2>
        <button className="refresh-btn" onClick={() => { setFilter('all'); onRefresh() }}>
          <i className="fas fa-rotate-right"></i> Refresh
        </button>
      </div>
      <div className="table-container">
        <table className="offboarding-table">
          <thead>
            <tr>
              <th>EMPLOYEE NAME</th>
              <th>ROLE</th>
              <th>EXIT DATE</th>
              <th>STATUS</th>
              <th>KEY TASKS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((emp, idx) => (
              <tr className="employee-row" data-status={emp.status} key={idx}>
                <td>{emp.name}</td>
                <td>{emp.role}</td>
                <td>{emp.exitDate}</td>
                <td>
                  <StatusBadge status={emp.status} />
                </td>
                <td>
                  <div className="task-icons">
                    {emp.tasks.map((t, i) => (
                      <span key={i}>
                        <Icon name={t} />
                      </span>
                    ))}
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: emp.progress + '%' }}></div>
                  </div>
                </td>
                <td>
                  <button className="reminder-btn" onClick={() => onSendReminder(idx)}>
                    Send Reminder
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [employees, setEmployees] = useState(initialEmployees)
  const [filter, setFilter] = useState('all')
  const [toastMsg, setToast] = useState('')

  const sendReminder = () => setToast('Reminder sent successfully!')
  const refresh = () => {
    setFilter('all')
    setEmployees([...initialEmployees])
    setToast('List refreshed')
  }

  return (
    <div>
      <Toast message={toastMsg} onHide={() => setToast('')} />
      <header className="header">
        <div className="logo">
          <div className="logo-icon">
            <i className="fas fa-star"></i>
          </div>
          <span>HRApp</span>
        </div>
        <h1>HR Offboarding Dashboard</h1>
        <div className="user-profile">
          <span>Ethan Cortez</span>
          <div className="profile-pic">
            <i className="fas fa-user"></i>
          </div>
        </div>
      </header>
      <div className="container">
        <aside className="sidebar">
          <button className="initiate-btn" onClick={() => setScreen('initiate')}>
            <i className="fas fa-briefcase"></i> Initiate Offboarding
          </button>
          <nav className="nav-menu">
            <a href="#" className={`nav-item ${screen === 'dashboard' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setScreen('dashboard') }}>
              <i className="fas fa-chart-bar"></i> Dashboard
            </a>
            <a href="#" className={`nav-item ${screen === 'offboarding-cases' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setScreen('offboarding-cases') }}>
              <i className="fas fa-file-alt"></i> Offboarding Cases
            </a>
            <a href="#" className={`nav-item ${screen === 'analytics' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setScreen('analytics') }}>
              <i className="fas fa-chart-line"></i> Analytics/Reports
            </a>
            <a href="#" className={`nav-item ${screen === 'settings' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); setScreen('settings') }}>
              <i className="fas fa-cog"></i> Settings
            </a>
          </nav>
        </aside>
        <main className="main-content">
          {screen === 'dashboard' && (
            <Dashboard employees={employees} filter={filter} setFilter={setFilter} onRefresh={refresh} onSendReminder={sendReminder} />
          )}
          {screen === 'offboarding-cases' && (
            <div className="screen">
              <h2>Offboarding Cases</h2>
              <p>This screen would show detailed offboarding case management.</p>
            </div>
          )}
          {screen === 'analytics' && (
            <div className="screen">
              <h2>Analytics & Reports</h2>
              <p>This screen would show detailed analytics and reporting data.</p>
            </div>
          )}
          {screen === 'settings' && (
            <div className="screen">
              <h2>Settings</h2>
              <p>This screen would show application settings and configuration options.</p>
            </div>
          )}
          {screen === 'initiate' && <InitiateForm setToast={setToast} onSubmitted={() => setScreen('dashboard')} />}
        </main>
        <RightSidebar employees={employees} setFilter={setFilter} />
      </div>
      <footer className="footer">
        <span>Made with</span>
        <div className="footer-logo">V</div>
      </footer>
    </div>
  )
}
