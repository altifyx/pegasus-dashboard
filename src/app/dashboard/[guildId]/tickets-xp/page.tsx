import { getTicketPanels, createTicketPanel, deleteTicketPanel, getActiveTickets, triggerTicketClose, triggerTicketClaim, triggerTicketLock, triggerTicketFreeze, getTicketDepartments, createTicketDepartment, deleteTicketDepartment, getUserXpList, getXpRewards, createXpReward, deleteXpReward, triggerXpReset, getXpSettings, updateXpSettings, getGuildChannels, getGuildRoles, getGuildMembers } from '@/app/actions';
import { Ticket, Award, Plus, Trash2, RefreshCw, Layers, ShieldCheck, CheckCircle, Settings2, Save, Trophy, Lock, Snowflake, UserCheck, BarChart3, GitBranch } from 'lucide-react';
import MultiSelect from '@/components/MultiSelect';
import SaveButton from '@/components/SaveButton';
import { formatNumber } from '@/lib/utils';

export default async function TicketsXpPage({
  params,
}: {
  params: Promise<{ guildId: string }>;
}) {
  const { guildId } = await params;
  const ticketPanels = await getTicketPanels(guildId);
  const activeTickets = await getActiveTickets(guildId);
  const ticketDepartments = await getTicketDepartments(guildId);
  const xpList = await getUserXpList(guildId);
  const xpRewards = await getXpRewards(guildId);
  const xpSettings = await getXpSettings(guildId);
  const channels = await getGuildChannels(guildId);
  const roles = await getGuildRoles(guildId);
  const members = await getGuildMembers(guildId);

  const textChannels = channels.filter(c => c.type === 'text');
  const categoryChannels = channels.filter(c => c.type === 'category');
  const channelOptions = channels
    .filter(c => c.type !== 'category')
    .map(c => ({ value: c.id, label: `${c.type === 'voice' ? '🔊 ' : '#'}${c.name}` }));

  const roleOptions = roles.map(r => ({ value: r.id, label: `@${r.name}` }));
  if (roleOptions.length === 0) {
    roleOptions.push(
      { value: '99988877766655544', label: 'Support Staff / VIP' },
      { value: '88877766655544433', label: 'Moderator / Regular' },
      { value: '77766655544433322', label: 'Administrator / Master' }
    );
  }

  const membersMap = new Map(members.map(m => [m.id, m.username]));

  const parseJsonArray = (str?: string | null) => {
    if (!str) return [];
    try {
      const parsed = JSON.parse(str);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const totalTicketsCount = activeTickets.length;
  const openTicketsCount = activeTickets.filter(t => t.status === 'open').length;
  const claimedTicketsCount = activeTickets.filter(t => t.status === 'claimed').length;
  const closedTicketsCount = activeTickets.filter(t => t.status === 'closed').length;

  async function handleCreateTicketPanel(formData: FormData) {
    'use server';
    await createTicketPanel(guildId, formData);
  }

  async function handleDeleteTicketPanel(formData: FormData) {
    'use server';
    const panelId = formData.get('panelId') as string;
    if (panelId) {
      await deleteTicketPanel(guildId, panelId, formData);
    }
  }

  async function handleCreateTicketDepartment(formData: FormData) {
    'use server';
    await createTicketDepartment(guildId, formData);
  }

  async function handleDeleteTicketDepartment(formData: FormData) {
    'use server';
    const deptId = formData.get('deptId') as string;
    if (deptId) {
      await deleteTicketDepartment(guildId, deptId, formData);
    }
  }

  async function handleCloseTicket(formData: FormData) {
    'use server';
    const ticketId = formData.get('ticketId') as string;
    const reason = formData.get('reason') as string || 'Closed by dashboard administrator.';
    if (ticketId) {
      await triggerTicketClose(guildId, ticketId, reason);
    }
  }

  async function handleClaimTicket(formData: FormData) {
    'use server';
    const ticketId = formData.get('ticketId') as string;
    const userId = formData.get('userId') as string || '98765432101234567';
    if (ticketId) {
      await triggerTicketClaim(guildId, ticketId, userId);
    }
  }

  async function handleLockTicket(formData: FormData) {
    'use server';
    const ticketId = formData.get('ticketId') as string;
    const userId = formData.get('userId') as string || '98765432101234567';
    if (ticketId) {
      await triggerTicketLock(guildId, ticketId, userId);
    }
  }

  async function handleFreezeTicket(formData: FormData) {
    'use server';
    const ticketId = formData.get('ticketId') as string;
    const userId = formData.get('userId') as string || '98765432101234567';
    if (ticketId) {
      await triggerTicketFreeze(guildId, ticketId, userId);
    }
  }

  async function handleCreateXpReward(formData: FormData) {
    'use server';
    await createXpReward(guildId, formData);
  }

  async function handleDeleteXpReward(formData: FormData) {
    'use server';
    const levelStr = formData.get('level') as string;
    if (levelStr) {
      await deleteXpReward(guildId, parseInt(levelStr, 10), formData);
    }
  }

  async function handleUpdateXpSettings(formData: FormData) {
    'use server';
    await updateXpSettings(guildId, formData);
  }

  async function handleResetXp(formData: FormData) {
    'use server';
    await triggerXpReset(guildId, formData);
  }

  return (
    <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-16">
      {/* Header */}
      <div className="border-b border-white/5 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 border border-white/5 px-3 py-1 bg-white/[0.01] mb-4 text-xs font-mono tracking-wide text-neutral-400">
            <Ticket className="w-3.5 h-3.5 text-[#5E5CE6]" />
            <span>Support Tickets & Leveling Engine</span>
          </div>
          <h1 className="text-4xl font-light tracking-tight text-white mb-2">Tickets & XP Progression</h1>
          <p className="text-sm text-neutral-400 font-mono tracking-wide">
            Deploy interactive support ticket panels, configure automated role rewards, adjust XP channel blacklists, and inspect active leaderboards for Guild ({guildId}).
          </p>
        </div>
        <form action={handleResetXp}>
          <button
            type="submit"
            className="flex items-center gap-2 border border-red-500/30 bg-red-500/10 px-6 py-3 text-xs font-mono text-red-400 hover:bg-red-500 hover:text-black transition-all rounded-none"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Guild XP Leaderboard</span>
          </button>
        </form>
      </div>

      {/* Ticket Statistics Summary Banner */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <BarChart3 className="w-5 h-5 text-[#5E5CE6]" />
          <h2 className="text-xl font-light text-white tracking-wide">Tickets System Telemetry & Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 flex flex-col justify-between">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">{"// Total Tickets"}</div>
            <div className="text-4xl font-light text-white font-mono">{totalTicketsCount}</div>
            <div className="text-[11px] text-neutral-500 font-mono mt-2">All time generated tickets</div>
          </div>
          <div className="border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md p-6 flex flex-col justify-between">
            <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">{"// Open Tickets"}</div>
            <div className="text-4xl font-light text-emerald-300 font-mono">{openTicketsCount}</div>
            <div className="text-[11px] text-emerald-500/70 font-mono mt-2">Awaiting staff response</div>
          </div>
          <div className="border border-blue-500/20 bg-blue-500/5 backdrop-blur-md p-6 flex flex-col justify-between">
            <div className="text-xs font-mono text-blue-400 uppercase tracking-wider mb-2">{"// Claimed Tickets"}</div>
            <div className="text-4xl font-light text-blue-300 font-mono">{claimedTicketsCount}</div>
            <div className="text-[11px] text-blue-500/70 font-mono mt-2">Under active investigation</div>
          </div>
          <div className="border border-neutral-500/20 bg-neutral-500/5 backdrop-blur-md p-6 flex flex-col justify-between">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">{"// Closed Tickets"}</div>
            <div className="text-4xl font-light text-neutral-300 font-mono">{closedTicketsCount}</div>
            <div className="text-[11px] text-neutral-500 font-mono mt-2">Archived & resolved cases</div>
          </div>
        </div>
      </div>

      {/* Section 1: Ticket Panels CRUD & Full Schema Setup */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Layers className="w-5 h-5 text-[#5E5CE6]" />
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">Deploy & Configure Ticket Panels</h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">Create rich interactive button embeds in your Discord channels with advanced schema settings.</p>
          </div>
        </div>

        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 rounded-none">
          <form action={handleCreateTicketPanel} className="space-y-8 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Panel Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Server Support & Inquiries"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Target Discord Channel *</label>
                <select
                  name="channelId"
                  required
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="">-- Select Text Channel --</option>
                  {textChannels.map((c) => (
                    <option key={c.id} value={c.id}>
                      #{c.name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-2">Description *</label>
              <textarea
                name="description"
                required
                rows={2}
                placeholder="Click the button below to open a secure, private support channel with our moderation team."
                className="w-full bg-black border border-white/10 p-4 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors resize-y"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Button Label</label>
                <input
                  type="text"
                  name="buttonLabel"
                  defaultValue="Create Ticket"
                  required
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Button Style</label>
                <select
                  name="buttonStyle"
                  defaultValue="1"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="1">Primary (Blurple)</option>
                  <option value="2">Secondary (Grey)</option>
                  <option value="3">Success (Green)</option>
                  <option value="4">Danger (Red)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Max Tickets Per User</label>
                <input
                  type="number"
                  name="maxTicketsPerUser"
                  defaultValue={1}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Image URL (Optional Embed Banner)</label>
                <input
                  type="text"
                  name="imageUrl"
                  placeholder="https://example.com/banner.png"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Footer Text (Optional)</label>
                <input
                  type="text"
                  name="footer"
                  placeholder="Pegasus Bot Support Engine"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Discord Category ID</label>
                <select
                  name="categoryId"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="">-- Select Category --</option>
                  {categoryChannels.map((c) => (
                    <option key={c.id} value={c.id}>
                      🗂️ {c.name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Ticket Name Format</label>
                <input
                  type="text"
                  name="ticketNameFormat"
                  defaultValue="ticket-{number}"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Support Roles</label>
                <MultiSelect
                  name="supportRoles"
                  options={roleOptions}
                  initialSelected={['99988877766655544']}
                  placeholder="Select support roles..."
                  typeLabel="role"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-2">Ticket Welcome Message</label>
              <textarea
                name="welcomeMessage"
                rows={2}
                placeholder="Hello {user}, thank you for reaching out. Our staff team will assist you here shortly."
                className="w-full bg-black border border-white/10 p-4 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors resize-y"
              />
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-end">
              <SaveButton
                label="Deploy Ticket Panel"
                savingLabel="Deploying Panel..."
                savedLabel="Panel Deployed!"
                className="px-8"
                icon="plus"
              />
            </div>
          </form>
        </div>

        {/* Active Ticket Panels Table */}
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-hidden">
          <div className="p-4 border-b border-white/5 text-xs font-mono text-neutral-400 bg-white/[0.01]">
            {"// Active Configured Support Panels"}
          </div>
          {ticketPanels.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 bg-white/[0.01]">
                  <th className="py-3 px-4 font-medium">PANEL ID</th>
                  <th className="py-3 px-4 font-medium">TITLE / DESCRIPTION</th>
                  <th className="py-3 px-4 font-medium">CHANNEL / CATEGORY</th>
                  <th className="py-3 px-4 font-medium">BUTTON SPEC</th>
                  <th className="py-3 px-4 font-medium">FORMAT</th>
                  <th className="py-3 px-4 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {ticketPanels.map((tp) => (
                  <tr key={tp.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{tp.panelId}</td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{tp.title}</div>
                      <div className="text-[11px] text-neutral-500 truncate max-w-xs">{tp.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-white">#{tp.channelId}</div>
                      <div className="text-[11px] text-neutral-500">Cat: {tp.categoryId || 'None'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 bg-[#5E5CE6]/10 text-[#5E5CE6] border border-[#5E5CE6]/20 text-[10px]">
                        {tp.buttonLabel} (Style {tp.buttonStyle})
                      </span>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">{tp.ticketNameFormat}</td>
                    <td className="py-3 px-4 text-right">
                      <form action={handleDeleteTicketPanel} className="inline">
                        <input type="hidden" name="panelId" value={tp.id} />
                        <button
                          type="submit"
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove Panel"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-neutral-500">
              No active ticket panels established in this guild. Use the form above to deploy one.
            </div>
          )}
        </div>
      </div>

      {/* Section 2: Ticket Departments (Multi-Department Workflows) */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <GitBranch className="w-5 h-5 text-[#5E5CE6]" />
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">Ticket Departments & Routing Workflows</h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">Establish dedicated departments (e.g. Billing, Technical Support) under your ticket panels.</p>
          </div>
        </div>

        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 rounded-none">
          <form action={handleCreateTicketDepartment} className="space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Target Ticket Panel *</label>
                <select
                  name="panelId"
                  required
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="">-- Select Panel --</option>
                  {ticketPanels.map((tp) => (
                    <option key={tp.id} value={tp.id}>
                      {tp.title} ({tp.panelId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Department Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Billing Support"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Department Emoji</label>
                <input
                  type="text"
                  name="emoji"
                  placeholder="e.g. 💳"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-2">Department Description *</label>
              <input
                type="text"
                name="description"
                required
                placeholder="Inquiries regarding server subscriptions, store purchases, and billing issues."
                className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Category ID (Optional Override)</label>
                <select
                  name="categoryId"
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="">-- Select Category --</option>
                  {categoryChannels.map((c) => (
                    <option key={c.id} value={c.id}>
                      🗂️ {c.name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Support Roles</label>
                <MultiSelect
                  name="supportRoles"
                  options={roleOptions}
                  initialSelected={['99988877766655544']}
                  placeholder="Select support roles..."
                  typeLabel="role"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">SLA Timeout (Minutes)</label>
                <input
                  type="number"
                  name="slaTimeoutMinutes"
                  defaultValue={60}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-neutral-400 uppercase tracking-wider mb-2">Department Welcome Message</label>
              <textarea
                name="welcomeMessage"
                rows={2}
                placeholder="Welcome to Billing Support. Please state your transaction ID and issue."
                className="w-full bg-black border border-white/10 p-4 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors resize-y"
              />
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-end">
              <SaveButton
                label="Register Department Workflow"
                savingLabel="Registering Department..."
                savedLabel="Department Registered!"
                className="px-8"
                icon="plus"
              />
            </div>
          </form>
        </div>

        {/* Active Ticket Departments Table */}
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-hidden">
          <div className="p-4 border-b border-white/5 text-xs font-mono text-neutral-400 bg-white/[0.01]">
            {"// Active Multi-Department Workflows"}
          </div>
          {ticketDepartments.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 bg-white/[0.01]">
                  <th className="py-3 px-4 font-medium">DEPT ID</th>
                  <th className="py-3 px-4 font-medium">NAME / DESCRIPTION</th>
                  <th className="py-3 px-4 font-medium">PANEL ID</th>
                  <th className="py-3 px-4 font-medium">SLA TIMEOUT</th>
                  <th className="py-3 px-4 font-medium text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {ticketDepartments.map((dept) => (
                  <tr key={dept.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-3 px-4 font-medium text-white">{dept.departmentId}</td>
                    <td className="py-3 px-4">
                      <div className="text-white font-medium">{dept.emoji} {dept.name}</div>
                      <div className="text-[11px] text-neutral-500 truncate max-w-xs">{dept.description}</div>
                    </td>
                    <td className="py-3 px-4 text-neutral-400">{dept.panelId}</td>
                    <td className="py-3 px-4 text-amber-400">{dept.slaTimeoutMinutes} mins</td>
                    <td className="py-3 px-4 text-right">
                      <form action={handleDeleteTicketDepartment} className="inline">
                        <input type="hidden" name="deptId" value={dept.id} />
                        <button
                          type="submit"
                          className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                          title="Remove Department"
                        >
                          <Trash2 className="w-4 h-4 inline" />
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-xs font-mono text-neutral-500">
              No ticket departments established in this guild.
            </div>
          )}
        </div>
      </div>

      {/* Section 3: Active Ongoing Tickets & Comprehensive State Management */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <ShieldCheck className="w-5 h-5 text-[#5E5CE6]" />
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">Active Support Tickets & Live Operations</h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">Perform live staff operations including Claiming, Locking, Freezing, or Closing active user tickets.</p>
          </div>
        </div>
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-hidden">
          {activeTickets.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 bg-white/[0.01]">
                  <th className="py-4 px-6 font-medium">TICKET #</th>
                  <th className="py-4 px-6 font-medium">CHANNEL / USER</th>
                  <th className="py-4 px-6 font-medium">INQUIRY / REASON</th>
                  <th className="py-4 px-6 font-medium">STATUS</th>
                  <th className="py-4 px-6 font-medium text-right">LIVE STAFF ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {activeTickets.map((t) => (
                  <tr key={t.id} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6 font-medium text-white">#{t.ticketNumber}</td>
                    <td className="py-4 px-6">
                      <div className="text-neutral-300">Ch: {t.channelId}</div>
                      <div className="text-[11px] text-neutral-500">User: {t.userId}</div>
                    </td>
                    <td className="py-4 px-6 text-neutral-400 max-w-xs truncate">
                      {t.reason || 'No reason specified'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 border text-[10px] uppercase tracking-wider ${
                        t.status === 'open' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        t.status === 'claimed' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        t.status === 'locked' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        t.status === 'frozen' ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' :
                        'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                      }`}>
                        {t.status}
                      </span>
                      {t.claimedBy && <div className="text-[10px] text-blue-400 mt-1">by: {t.claimedBy}</div>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-1.5 flex-wrap justify-end">
                        {t.status === 'open' && (
                          <form action={handleClaimTicket} className="inline">
                            <input type="hidden" name="ticketId" value={t.id} />
                            <input type="hidden" name="userId" value="98765432101234567" />
                            <button
                              type="submit"
                              className="flex items-center gap-1 border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[11px] text-blue-400 hover:bg-blue-500 hover:text-black transition-all rounded-none"
                              title="Claim Ticket"
                            >
                              <UserCheck className="w-3.5 h-3.5" />
                              <span>Claim</span>
                            </button>
                          </form>
                        )}
                        {t.status !== 'locked' && t.status !== 'closed' && (
                          <form action={handleLockTicket} className="inline">
                            <input type="hidden" name="ticketId" value={t.id} />
                            <input type="hidden" name="userId" value="98765432101234567" />
                            <button
                              type="submit"
                              className="flex items-center gap-1 border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] text-amber-400 hover:bg-amber-500 hover:text-black transition-all rounded-none"
                              title="Lock Ticket"
                            >
                              <Lock className="w-3.5 h-3.5" />
                              <span>Lock</span>
                            </button>
                          </form>
                        )}
                        {t.status !== 'frozen' && t.status !== 'closed' && (
                          <form action={handleFreezeTicket} className="inline">
                            <input type="hidden" name="ticketId" value={t.id} />
                            <input type="hidden" name="userId" value="98765432101234567" />
                            <button
                              type="submit"
                              className="flex items-center gap-1 border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1 text-[11px] text-cyan-400 hover:bg-cyan-500 hover:text-black transition-all rounded-none"
                              title="Freeze Ticket"
                            >
                              <Snowflake className="w-3.5 h-3.5" />
                              <span>Freeze</span>
                            </button>
                          </form>
                        )}
                        {t.status !== 'closed' && (
                          <form action={handleCloseTicket} className="inline-flex items-center gap-1.5">
                            <input type="hidden" name="ticketId" value={t.id} />
                            <input
                              type="text"
                              name="reason"
                              placeholder="Close reason..."
                              className="bg-black border border-white/10 px-2 py-1 text-[11px] text-white rounded-none focus:border-[#5E5CE6] focus:outline-none w-28"
                            />
                            <button
                              type="submit"
                              className="flex items-center gap-1 border border-red-500/30 bg-red-500/10 px-2.5 py-1 text-[11px] text-red-400 hover:bg-red-500 hover:text-black transition-all rounded-none"
                            >
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>Close</span>
                            </button>
                          </form>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-xs font-mono text-neutral-500">
              No active support tickets open in this guild.
            </div>
          )}
        </div>
      </div>

      {/* Section 4: XP General Settings CRUD */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Settings2 className="w-5 h-5 text-[#5E5CE6]" />
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">XP Progression Parameters & Filters</h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">Fine-tune reward stacking, channel whitelisting, and double XP zones.</p>
          </div>
        </div>
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 rounded-none">
          <form action={handleUpdateXpSettings} className="space-y-8 font-mono text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Enable Level-Up Role Rewards</label>
                <select
                  name="levelUpRewardsEnabled"
                  defaultValue={xpSettings.levelUpRewardsEnabled ? 'true' : 'false'}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="true">Enabled (Auto-assign on Level Up)</option>
                  <option value="false">Disabled (Tracking Only)</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Stack Role Rewards</label>
                <select
                  name="stackRoleRewards"
                  defaultValue={xpSettings.stackRoleRewards ? 'true' : 'false'}
                  className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                >
                  <option value="true">Stack Roles (Keep previous tier roles)</option>
                  <option value="false">Replace Roles (Remove previous tier roles)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Ignored Channels</label>
                <MultiSelect
                  name="ignoredChannels"
                  options={channelOptions}
                  initialSelected={parseJsonArray(xpSettings.ignoredChannels)}
                  placeholder="Select channels to ignore..."
                  typeLabel="channel"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Ignored Roles</label>
                <MultiSelect
                  name="ignoredRoles"
                  options={roleOptions}
                  initialSelected={parseJsonArray(xpSettings.ignoredRoles)}
                  placeholder="Select roles to ignore..."
                  typeLabel="role"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">No XP Channels (Muted Experience)</label>
                <MultiSelect
                  name="noXpChannels"
                  options={channelOptions}
                  initialSelected={parseJsonArray(xpSettings.noXpChannels)}
                  placeholder="Select muted channels..."
                  typeLabel="channel"
                />
              </div>

              <div>
                <label className="block text-neutral-400 uppercase tracking-wider mb-2">Double XP Channels (Booster Zones)</label>
                <MultiSelect
                  name="doubleXpChannels"
                  options={channelOptions}
                  initialSelected={parseJsonArray(xpSettings.doubleXpChannels)}
                  placeholder="Select booster channels..."
                  typeLabel="channel"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-end">
              <SaveButton
                label="Save XP Parameters"
                savingLabel="Saving XP Parameters..."
                savedLabel="XP Parameters Saved!"
                className="px-8"
                icon="save"
              />
            </div>
          </form>
        </div>
      </div>

      {/* Section 5: XP Rewards CRUD */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Award className="w-5 h-5 text-[#5E5CE6]" />
          <div>
            <h2 className="text-xl font-light text-white tracking-wide">Configure XP Role Rewards</h2>
            <p className="text-neutral-500 font-mono text-xs mt-1">Automatically grant prestigious Discord roles upon reaching level thresholds.</p>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-8 rounded-none">
            <form action={handleCreateXpReward} className="space-y-6 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-2">Target Level Threshold</label>
                  <input
                    type="number"
                    name="level"
                    defaultValue={10}
                    required
                    placeholder="e.g. 10"
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 uppercase tracking-wider mb-2">Reward Role ID</label>
                  <select
                    name="roleId"
                    required
                    className="w-full bg-black border border-white/10 px-4 py-3 text-white rounded-none focus:border-[#5E5CE6] focus:outline-none transition-colors"
                  >
                    <option value="">-- Select Role --</option>
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>
                        @{r.name} ({r.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <SaveButton
                label="Register Role Reward"
                savingLabel="Registering Reward..."
                savedLabel="Reward Registered!"
                className="w-full"
                icon="plus"
              />
            </form>
          </div>

          {/* XP Rewards Table */}
          <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-hidden">
            <div className="p-4 border-b border-white/5 text-xs font-mono text-neutral-400 bg-white/[0.01]">
              {"// Active Tier Perks"}
            </div>
            {xpRewards.length > 0 ? (
              <table className="w-full text-left border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-white/5 text-neutral-500 bg-white/[0.01]">
                    <th className="py-3 px-4 font-medium">LEVEL THRESHOLD</th>
                    <th className="py-3 px-4 font-medium">ASSIGNED ROLE ID</th>
                    <th className="py-3 px-4 font-medium text-right">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-neutral-300">
                  {xpRewards.map((reward) => (
                    <tr key={reward.level} className="hover:bg-white/[0.01] transition-colors">
                      <td className="py-3 px-4 text-emerald-400 font-medium">Level {reward.level}</td>
                      <td className="py-3 px-4 text-white font-mono">{reward.roleId}</td>
                      <td className="py-3 px-4 text-right">
                        <form action={handleDeleteXpReward} className="inline">
                          <input type="hidden" name="level" value={reward.level} />
                          <button
                            type="submit"
                            className="text-neutral-500 hover:text-red-400 transition-colors p-1"
                            title="Remove Reward"
                          >
                            <Trash2 className="w-4 h-4 inline" />
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-8 text-center text-xs font-mono text-neutral-500">
                No XP role rewards registered yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Section 6: User XP Leaderboard */}
      <div className="space-y-6 pt-8 border-t border-white/5">
        <div className="flex items-center gap-3 border-b border-white/5 pb-4">
          <Trophy className="w-5 h-5 text-[#5E5CE6]" />
          <h2 className="text-xl font-light text-white tracking-wide">Guild XP Progression Leaderboard</h2>
        </div>
        <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-hidden">
          {xpList.length > 0 ? (
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-white/5 text-neutral-500 bg-white/[0.01]">
                  <th className="py-4 px-6 font-medium">USER</th>
                  <th className="py-4 px-6 font-medium text-right">XP ACCUMULATED</th>
                  <th className="py-4 px-6 font-medium text-right">CURRENT LEVEL</th>
                  <th className="py-4 px-6 font-medium text-right">PRESTIGE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-neutral-300">
                {xpList.map((userXp) => (
                  <tr key={userXp.userId} className="hover:bg-white/[0.01] transition-colors">
                    <td className="py-4 px-6 font-medium text-white">
                      {membersMap.get(userXp.userId) || `User (${userXp.userId})`}
                    </td>
                    <td className="py-4 px-6 text-right text-emerald-400 font-medium" title={userXp.xp.toLocaleString()}>
                      {formatNumber(userXp.xp)}
                    </td>
                    <td className="py-4 px-6 text-right text-amber-400 font-medium">Level {userXp.level}</td>
                    <td className="py-4 px-6 text-right text-[#5E5CE6] font-medium">Prestige {userXp.prestigeLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-12 text-center text-xs font-mono text-neutral-500">
              No XP accumulated by users in this guild yet.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
