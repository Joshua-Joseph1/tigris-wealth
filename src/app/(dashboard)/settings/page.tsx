'use client'

import { Building2, Key, Mail } from 'lucide-react'

export default function SettingsPage() {
  // TODO: Connect to backend for actual settings management
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-text-muted mt-1">Configure your workspace</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Firm Profile */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Firm Profile</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Firm Name</label>
              <input
                type="text"
                defaultValue="InvestOps Capital"
                className="w-full px-4 py-2 bg-surface-near border border-border rounded-xl text-sm"
                placeholder="Enter firm name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Logo</label>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 bg-surface-near border border-border rounded-xl flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-text-muted" />
                </div>
                <button className="px-4 py-2 bg-surface-elevated hover:bg-surface border border-border rounded-xl text-sm">
                  {/* TODO: Implement file upload */}
                  Upload Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl">
          <div className="flex items-center gap-3 mb-4">
            <Key className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">API Keys</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Production Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="sk_prod_••••••••••••••••"
                  readOnly
                  className="flex-1 px-4 py-2 bg-surface-near border border-border rounded-xl text-sm"
                />
                <button className="px-4 py-2 bg-surface-elevated hover:bg-surface border border-border rounded-xl text-sm">
                  Reveal
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Test Key</label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value="sk_test_••••••••••••••••"
                  readOnly
                  className="flex-1 px-4 py-2 bg-surface-near border border-border rounded-xl text-sm"
                />
                <button className="px-4 py-2 bg-surface-elevated hover:bg-surface border border-border rounded-xl text-sm">
                  Reveal
                </button>
              </div>
            </div>

            <p className="text-xs text-text-muted">
              {/* TODO: Connect backend for API key management */}
              API keys will be connected to backend services
            </p>
          </div>
        </div>

        {/* Email Templates */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold">Email Templates</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Meeting Follow-up Template</label>
              <textarea
                rows={6}
                defaultValue="Hi {client_name},\n\nThank you for taking the time to meet with us today. We enjoyed discussing your investment goals and how we can help you achieve them.\n\nAs discussed, I'll follow up with the information about {topic} by {date}.\n\nBest regards,\n{sender_name}"
                className="w-full px-4 py-3 bg-surface-near border border-border rounded-xl text-sm font-mono"
              />
            </div>

            <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-white rounded-xl text-sm font-medium">
              {/* TODO: Save template to backend */}
              Save Template
            </button>
          </div>
        </div>

        {/* Roles Matrix */}
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-2xl lg:col-span-2">
          <h2 className="text-lg font-semibold mb-4">Roles & Permissions</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border">
                <tr>
                  <th className="text-left py-3 pr-4">Permission</th>
                  <th className="text-center py-3 px-4">Admin</th>
                  <th className="text-center py-3 px-4">RM</th>
                  <th className="text-center py-3 px-4">Analyst</th>
                  <th className="text-center py-3 px-4">Viewer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[
                  { name: 'View all clients', admin: true, rm: true, analyst: true, viewer: true },
                  { name: 'Edit clients', admin: true, rm: true, analyst: false, viewer: false },
                  { name: 'Delete clients', admin: true, rm: false, analyst: false, viewer: false },
                  { name: 'Manage deals', admin: true, rm: true, analyst: false, viewer: false },
                  { name: 'Edit tasks', admin: true, rm: true, analyst: true, viewer: false },
                  { name: 'View compliance', admin: true, rm: true, analyst: true, viewer: true },
                ].map((perm, idx) => (
                  <tr key={idx}>
                    <td className="py-3 pr-4 text-text-muted">{perm.name}</td>
                    <td className="text-center py-3 px-4">
                      {perm.admin ? <span className="text-success">✓</span> : <span className="text-text-muted">-</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {perm.rm ? <span className="text-success">✓</span> : <span className="text-text-muted">-</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {perm.analyst ? <span className="text-success">✓</span> : <span className="text-text-muted">-</span>}
                    </td>
                    <td className="text-center py-3 px-4">
                      {perm.viewer ? <span className="text-success">✓</span> : <span className="text-text-muted">-</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-text-muted mt-4">
            {/* TODO: Wire real auth and permissions */}
            Permissions matrix is view-only in this UI-only version
          </p>
        </div>
      </div>
    </div>
  )
}
