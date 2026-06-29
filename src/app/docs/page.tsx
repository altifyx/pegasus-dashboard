"use client";

import React, { useState, useMemo } from 'react';
import { Search, Shield, Settings, Terminal, Layers, ChevronRight, Hash } from 'lucide-react';



interface CommandOption {
  name: string;
  type: string;
  required: boolean;
  description: string;
}

interface Command {
  name: string;
  description: string;
  options: CommandOption[];
}

interface Category {
  id: string;
  name: string;
  description: string;
  commands: Command[];
}

const COMMAND_CATEGORIES: Category[] = [
  {
    id: 'admin',
    name: '1. Admin',
    description: 'Administrative commands for managing bot security, modules, blacklists, and server pruning.',
    commands: [
      {
        name: '/auditlog view',
        description: 'View security audit logs for the server.',
        options: [
          { name: 'user', type: 'User', required: false, description: 'Filter logs by a specific user.' },
          { name: 'action_type', type: 'String', required: false, description: 'Filter logs by action type (e.g., BAN, KICK, TIMEOUT).' },
          { name: 'limit', type: 'Integer', required: false, description: 'Number of logs to fetch (1-50, default: 10).' }
        ]
      },
      {
        name: '/blacklist add',
        description: "Add a user to the bot's global blacklist.",
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to blacklist.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for blacklisting.' }
        ]
      },
      {
        name: '/blacklist remove',
        description: "Remove a user from the bot's global blacklist.",
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to unblacklist.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for removal.' }
        ]
      },
      {
        name: '/blacklist check',
        description: 'Check if a user is currently blacklisted.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to check.' }
        ]
      },
      {
        name: '/module enable',
        description: 'Enable a specific bot module dynamically per server.',
        options: [
          { name: 'module', type: 'String', required: true, description: 'Choices: economy, tickets, fun, moderation, xp, giveaways, jtc, automod.' }
        ]
      },
      {
        name: '/module disable',
        description: 'Disable a specific bot module dynamically per server.',
        options: [
          { name: 'module', type: 'String', required: true, description: 'Choices: economy, tickets, fun, moderation, xp, giveaways, jtc, automod.' }
        ]
      },
      {
        name: '/module status',
        description: 'View the active/inactive status of all modules in the server.',
        options: []
      },
      {
        name: '/prune',
        description: 'Prune inactive members from the server.',
        options: [
          { name: 'days', type: 'Integer', required: true, description: 'Number of days of inactivity (1-30).' },
          { name: 'dry_run', type: 'Boolean', required: false, description: 'If true, simulates the prune and returns the count without kicking.' },
          { name: 'roles', type: 'Role', required: false, description: 'Only prune members with this specific role.' },
          { name: 'reason', type: 'String', required: false, description: 'Audit log reason for the prune.' }
        ]
      }
    ]
  },
  {
    id: 'config',
    name: '2. Configuration',
    description: 'Configure server-specific settings, custom embeds, and reaction roles.',
    commands: [
      {
        name: '/config view',
        description: 'View all current server configurations.',
        options: []
      },
      {
        name: '/config set',
        description: 'Set a specific configuration key.',
        options: [
          { name: 'setting', type: 'String', required: true, description: 'Choices: prefix, log_channel, welcome_channel, mute_role, max_warnings.' },
          { name: 'value', type: 'String', required: true, description: 'The new value (Channel ID, Role ID, or text/number).' }
        ]
      },
      {
        name: '/embed create',
        description: 'Create and send fully customizable rich embeds.',
        options: [
          { name: 'channel', type: 'Channel', required: true, description: 'The channel where the embed will be sent.' },
          { name: 'title', type: 'String', required: true, description: 'Embed title (max 256 characters).' },
          { name: 'description', type: 'String', required: true, description: 'Embed description (max 4096 characters).' },
          { name: 'color', type: 'String', required: false, description: 'Hex color code (e.g., #5865F2).' },
          { name: 'url', type: 'String', required: false, description: 'Title clickable URL.' },
          { name: 'author_name', type: 'String', required: false, description: 'Author text.' },
          { name: 'author_icon', type: 'String', required: false, description: 'Author icon image URL.' },
          { name: 'thumbnail', type: 'String', required: false, description: 'Thumbnail image URL.' },
          { name: 'image', type: 'String', required: false, description: 'Main large image URL.' },
          { name: 'footer_text', type: 'String', required: false, description: 'Footer text.' },
          { name: 'footer_icon', type: 'String', required: false, description: 'Footer icon image URL.' },
          { name: 'timestamp', type: 'Boolean', required: false, description: 'Whether to include the current timestamp.' }
        ]
      },
      {
        name: '/reactionrole add',
        description: 'Add a reaction role to a message.',
        options: [
          { name: 'message_id', type: 'String', required: true, description: 'The target message ID.' },
          { name: 'emoji', type: 'String', required: true, description: 'The emoji to react with.' },
          { name: 'role', type: 'Role', required: true, description: 'The role to assign upon reacting.' },
          { name: 'channel', type: 'Channel', required: false, description: 'The channel where the message is located.' }
        ]
      },
      {
        name: '/reactionrole remove',
        description: 'Remove a reaction role from a message.',
        options: [
          { name: 'message_id', type: 'String', required: true, description: 'The target message ID.' },
          { name: 'emoji', type: 'String', required: true, description: 'The emoji to remove.' }
        ]
      },
      {
        name: '/reactionrole list',
        description: 'List all configured reaction roles.',
        options: [
          { name: 'channel', type: 'Channel', required: false, description: 'Filter reaction roles by a specific channel.' }
        ]
      }
    ]
  },
  {
    id: 'economy',
    name: '3. Economy',
    description: 'Engage users with a feature-rich economy system, including daily rewards, jobs, gambling, and a server item shop.',
    commands: [
      {
        name: '/eco balance',
        description: 'View current coin balance.',
        options: [
          { name: 'user', type: 'User', required: false, description: 'The user whose balance you want to check.' }
        ]
      },
      {
        name: '/eco daily',
        description: 'Claim your daily coin reward.',
        options: []
      },
      {
        name: '/eco work',
        description: 'Perform a job to earn coins (subject to cooldown).',
        options: []
      },
      {
        name: '/eco rob',
        description: 'Attempt to steal coins from another user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'The target user to rob.' }
        ]
      },
      {
        name: '/eco gamble dice',
        description: 'Roll a dice to double or lose your bet.',
        options: [
          { name: 'amount', type: 'Integer', required: true, description: 'Amount of coins to bet.' }
        ]
      },
      {
        name: '/eco gamble flip',
        description: 'Flip a coin (heads/tails).',
        options: [
          { name: 'amount', type: 'Integer', required: true, description: 'Amount of coins to bet.' },
          { name: 'choice', type: 'String', required: true, description: 'Choices: Heads, Tails.' }
        ]
      },
      {
        name: '/eco gamble slots',
        description: 'Play the slot machine.',
        options: [
          { name: 'amount', type: 'Integer', required: true, description: 'Amount of coins to bet.' }
        ]
      },
      {
        name: '/eco shop list',
        description: 'List all available items in the server shop.',
        options: []
      },
      {
        name: '/eco shop buy',
        description: 'Buy an item from the shop.',
        options: [
          { name: 'item_id', type: 'String', required: true, description: 'The ID of the item to purchase.' }
        ]
      },
      {
        name: '/eco shop info',
        description: 'Get detailed information about a shop item.',
        options: [
          { name: 'item_id', type: 'String', required: true, description: 'The ID of the item.' }
        ]
      },
      {
        name: '/eco shop use',
        description: 'Use an item from your inventory.',
        options: [
          { name: 'item_id', type: 'String', required: true, description: 'The ID of the item to use.' }
        ]
      },
      {
        name: '/eco shop inventory',
        description: 'View item inventory.',
        options: [
          { name: 'user', type: 'User', required: false, description: 'The user whose inventory you want to check.' }
        ]
      }
    ]
  },
  {
    id: 'fun',
    name: '4. Fun',
    description: 'Interactive entertainment commands for server members.',
    commands: [
      { name: '/fun meme', description: 'Fetch a random popular meme from Reddit/Imgflip.', options: [] },
      { name: '/fun fact', description: 'Receive a random interesting fact.', options: [] },
      { name: '/fun quote', description: 'Receive a random inspiring quote.', options: [] },
      { name: '/fun joke', description: 'Get a general random joke.', options: [] },
      { name: '/fun dadjoke', description: 'Get a classic dad joke.', options: [] }
    ]
  },
  {
    id: 'giveaways',
    name: '5. Giveaways',
    description: 'Easily host, configure, and manage server giveaways.',
    commands: [
      {
        name: '/gw start',
        description: 'Start a giveaway with an advanced interactive modal.',
        options: [
          { name: 'prize', type: 'String', required: true, description: 'The prize description (max 255 characters).' },
          { name: 'duration', type: 'String', required: true, description: 'Duration (e.g., 10m, 2h, 1d).' },
          { name: 'winners', type: 'Integer', required: false, description: 'Number of winners (1-20, default: 1).' },
          { name: 'channel', type: 'Channel', required: false, description: 'Text channel to host the giveaway in.' }
        ]
      },
      {
        name: '/gw simple',
        description: 'Quickly start a simple giveaway directly in the current channel.',
        options: [
          { name: 'prize', type: 'String', required: true, description: 'The prize description.' },
          { name: 'duration', type: 'String', required: true, description: 'Duration (e.g., 10m, 2h, 1d).' },
          { name: 'winners', type: 'Integer', required: true, description: 'Number of winners (1-20).' }
        ]
      },
      {
        name: '/gw end',
        description: 'Immediately end an active giveaway and roll winners.',
        options: [
          { name: 'giveaway_id', type: 'String', required: true, description: 'The message ID / giveaway ID.' }
        ]
      },
      {
        name: '/gw reroll',
        description: 'Reroll winners for a finished giveaway.',
        options: [
          { name: 'giveaway_id', type: 'String', required: true, description: 'The message ID / giveaway ID.' },
          { name: 'winners', type: 'Integer', required: false, description: 'Number of new winners to select.' }
        ]
      },
      {
        name: '/gw configure',
        description: 'Open the configuration modal for an existing giveaway.',
        options: [
          { name: 'giveaway_id', type: 'String', required: true, description: 'The message ID / giveaway ID.' }
        ]
      }
    ]
  },
  {
    id: 'moderation',
    name: '6. Moderation & AutoMod',
    description: 'Powerful moderation capabilities, AutoMod V2 rules, Quarantine Vault, word filtering, and advanced warning automation.',
    commands: [
      {
        name: '/automod add_rule',
        description: 'Add a new automated rule.',
        options: [
          { name: 'name', type: 'String', required: true, description: 'Rule name.' },
          { name: 'trigger_type', type: 'String', required: true, description: 'Trigger condition. Choices: Keyword Match, Regex Match, Mention Spam, Attachment Spam.' },
          { name: 'action_type', type: 'String', required: true, description: 'Action to execute. Choices: Delete Message, Warn User, Timeout User, Add Infraction Points.' },
          { name: 'keywords', type: 'String', required: false, description: 'Comma-separated keywords (required if trigger is Keyword).' },
          { name: 'regex_pattern', type: 'String', required: false, description: 'Regex pattern (required if trigger is Regex).' },
          { name: 'limit', type: 'Integer', required: false, description: 'Threshold limit for mention/attachment spam.' },
          { name: 'points', type: 'Integer', required: false, description: 'Infraction points to add.' }
        ]
      },
      {
        name: '/automod list_rules',
        description: 'List all configured AutoMod V2 rules in the server.',
        options: []
      },
      {
        name: '/automod remove_rule',
        description: 'Delete an AutoMod V2 rule.',
        options: [
          { name: 'rule_id', type: 'String', required: true, description: 'UUID of the rule to remove.' }
        ]
      },
      {
        name: '/automod quarantine_list',
        description: 'List all users currently held in the Quarantine Vault.',
        options: []
      },
      {
        name: '/automod quarantine_release',
        description: 'Release a user from the Quarantine Vault.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to release.' }
        ]
      },
      {
        name: '/filter add',
        description: 'Add a word filter rule.',
        options: [
          { name: 'pattern', type: 'String', required: true, description: 'The word or regex pattern to filter.' },
          { name: 'match_type', type: 'String', required: false, description: 'Choices: Literal, Regex.' },
          { name: 'case_sensitive', type: 'Boolean', required: false, description: 'Whether matching should be case-sensitive.' },
          { name: 'whole_word', type: 'Boolean', required: false, description: 'Whether to match only whole words.' },
          { name: 'severity', type: 'String', required: false, description: 'Choices: Low, Medium, High, Critical.' },
          { name: 'auto_delete', type: 'Boolean', required: false, description: 'Whether to automatically delete matching messages.' },
          { name: 'notify_channel', type: 'Channel', required: false, description: 'Target channel for filter violation alerts.' }
        ]
      },
      {
        name: '/filter remove',
        description: 'Remove a word filter rule.',
        options: [
          { name: 'rule_id', type: 'Integer', required: true, description: 'ID of the filter rule.' }
        ]
      },
      {
        name: '/filter list',
        description: 'List all active word filter rules.',
        options: []
      },
      {
        name: '/moderation ban',
        description: 'Ban a user from the server.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'User to ban.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for banning.' },
          { name: 'delete_days', type: 'Integer', required: false, description: 'Number of days of messages to delete (0-7).' }
        ]
      },
      {
        name: '/moderation kick',
        description: 'Kick a user from the server.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'User to kick.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for kicking.' }
        ]
      },
      {
        name: '/moderation timeout',
        description: 'Temporarily timeout (mute) a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'User to timeout.' },
          { name: 'duration', type: 'Integer', required: true, description: 'Choices range from 60 seconds to 4 weeks.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for timeout.' }
        ]
      },
      {
        name: '/moderation mute',
        description: 'Assign the server mute role to a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'User to mute.' },
          { name: 'duration', type: 'Integer', required: false, description: 'Duration in minutes (1-10080).' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for mute.' }
        ]
      },
      {
        name: '/moderation unmute',
        description: 'Remove the server mute role from a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'User to unmute.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for unmute.' }
        ]
      },
      {
        name: '/moderation unban',
        description: 'Unban a user by their Snowflake ID.',
        options: [
          { name: 'user_id', type: 'String', required: true, description: 'Discord User ID to unban.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for unban.' }
        ]
      },
      {
        name: '/moderation purge',
        description: 'Delete multiple messages rapidly.',
        options: [
          { name: 'amount', type: 'Integer', required: true, description: 'Number of messages to delete (2-100).' },
          { name: 'user', type: 'User', required: false, description: 'Only delete messages sent by this user.' },
          { name: 'channel', type: 'Channel', required: false, description: 'Target channel to purge in.' }
        ]
      },
      {
        name: '/moderation lock',
        description: 'Lock a channel (prevents regular members from sending messages).',
        options: [
          { name: 'channel', type: 'Channel', required: false, description: 'Target channel to lock.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for locking.' }
        ]
      },
      {
        name: '/moderation unlock',
        description: 'Unlock a locked channel.',
        options: [
          { name: 'channel', type: 'Channel', required: false, description: 'Target channel to unlock.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for unlocking.' }
        ]
      },
      {
        name: '/moderation slowmode',
        description: 'Set slowmode delay in a channel.',
        options: [
          { name: 'duration', type: 'Integer', required: true, description: 'Slowmode delay in seconds (0-21600). 0 disables slowmode.' },
          { name: 'channel', type: 'Channel', required: false, description: 'Target channel.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for slowmode change.' }
        ]
      },
      {
        name: '/moderation modlog',
        description: 'View moderation history logs.',
        options: [
          { name: 'user', type: 'User', required: false, description: 'Filter logs by user.' },
          { name: 'limit', type: 'Integer', required: false, description: 'Number of logs to show (1-25).' }
        ]
      },
      {
        name: '/moderation case view',
        description: 'View details of a specific moderation case.',
        options: [
          { name: 'id', type: 'Integer', required: true, description: 'Case ID.' }
        ]
      },
      {
        name: '/moderation case delete',
        description: 'Delete a specific moderation case.',
        options: [
          { name: 'id', type: 'Integer', required: true, description: 'Case ID.' }
        ]
      },
      {
        name: '/moderation reset-xp',
        description: "Reset a user's XP progression.",
        options: [
          { name: 'user', type: 'User', required: true, description: 'Target user.' },
          { name: 'confirm', type: 'Boolean', required: true, description: 'Confirmation flag.' }
        ]
      },
      {
        name: '/warn create',
        description: 'Issue a warning to a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to warn.' },
          { name: 'title', type: 'String', required: true, description: 'Summary/title of the warning.' },
          { name: 'description', type: 'String', required: false, description: 'Detailed description/context.' },
          { name: 'level', type: 'Integer', required: false, description: 'Severity level (1-10).' },
          { name: 'proof', type: 'Attachment', required: false, description: 'Supporting screenshot/attachment.' }
        ]
      },
      {
        name: '/warn edit',
        description: 'Edit an existing warning.',
        options: [
          { name: 'warnid', type: 'String', required: true, description: 'Warning ID to edit.' }
        ]
      },
      {
        name: '/warn lookup',
        description: 'Look up details of a specific warning.',
        options: [
          { name: 'warnid', type: 'String', required: true, description: 'Warning ID.' }
        ]
      },
      {
        name: '/warn delete',
        description: 'Delete a specific warning.',
        options: [
          { name: 'warnid', type: 'String', required: true, description: 'Warning ID.' }
        ]
      },
      {
        name: '/warn view',
        description: 'View all warnings for a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'Target user.' }
        ]
      },
      {
        name: '/warn purge',
        description: 'Remove all warnings for a user.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'Target user.' }
        ]
      },
      {
        name: '/warn automation create',
        description: 'Create an automation trigger (e.g., timeout/ban when warn count or level is reached).',
        options: [
          { name: 'trigger_type', type: 'String', required: true, description: 'Choices: Warn Count, Warn Level.' },
          { name: 'trigger_value', type: 'Integer', required: true, description: 'Threshold number that activates the trigger (1-100).' },
          { name: 'notify_channel', type: 'Channel', required: false, description: 'Channel to send alert when automation triggers.' }
        ]
      },
      {
        name: '/warn automation view',
        description: 'View all active warning automations in the server.',
        options: []
      },
      {
        name: '/warn automation delete',
        description: 'Delete a warning automation.',
        options: [
          { name: 'automation_id', type: 'String', required: true, description: 'Automation ID to delete.' }
        ]
      }
    ]
  },
  {
    id: 'tickets',
    name: '7. Tickets',
    description: 'Manage ticket panels, multi-department support setups, and active ticket workflows.',
    commands: [
      { name: '/ticket claim', description: 'Claim an active ticket (for support staff).', options: [] },
      {
        name: '/ticket close',
        description: 'Close an active ticket.',
        options: [
          { name: 'reason', type: 'String', required: false, description: 'Reason for closing the ticket.' }
        ]
      },
      { name: '/ticket stats', description: 'View ticket system statistics for the server.', options: [] },
      {
        name: '/ticket panel create',
        description: 'Create a new ticket panel configuration.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'Unique ID for the panel (3-20 chars).' },
          { name: 'title', type: 'String', required: true, description: 'Panel title.' },
          { name: 'description', type: 'String', required: true, description: 'Panel description.' },
          { name: 'button_label', type: 'String', required: false, description: 'Text on the open ticket button.' },
          { name: 'button_style', type: 'Integer', required: false, description: 'Choices: Primary (Blue), Secondary (Gray), Success (Green), Danger (Red).' },
          { name: 'category', type: 'Channel', required: false, description: 'Discord Category where tickets will be created.' },
          { name: 'support_role', type: 'Role', required: false, description: 'Staff role granted access to tickets.' },
          { name: 'max_tickets', type: 'Integer', required: false, description: 'Max concurrent tickets per user (1-10).' },
          { name: 'welcome_message', type: 'String', required: false, description: 'Initial message sent when a ticket opens.' }
        ]
      },
      {
        name: '/ticket panel load',
        description: 'Send an existing ticket panel to a specific channel.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'ID of the panel to load.' },
          { name: 'channel', type: 'Channel', required: true, description: 'Text channel to post the panel in.' }
        ]
      },
      {
        name: '/ticket panel delete',
        description: 'Delete a ticket panel configuration.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'ID of the panel to delete.' }
        ]
      },
      { name: '/ticket panel list', description: 'List all configured ticket panels in the server.', options: [] },
      {
        name: '/ticket panel edit',
        description: 'Open interactive editor for a ticket panel.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'ID of the panel to edit.' }
        ]
      },
      {
        name: '/ticket panel add_dept',
        description: 'Add a specific department choice to a ticket panel.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'Target panel ID.' },
          { name: 'dept_id', type: 'String', required: true, description: 'Unique department ID.' },
          { name: 'name', type: 'String', required: true, description: 'Department display name.' },
          { name: 'description', type: 'String', required: true, description: 'Department description.' },
          { name: 'support_role', type: 'Role', required: false, description: 'Specific support role for this department.' },
          { name: 'category', type: 'Channel', required: false, description: 'Specific category channel for this department.' },
          { name: 'welcome_message', type: 'String', required: false, description: 'Specific welcome message for this department.' }
        ]
      },
      {
        name: '/ticket panel list_depts',
        description: 'List all departments configured on a panel.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'Target panel ID.' }
        ]
      },
      {
        name: '/ticket panel remove_dept',
        description: 'Remove a department from a panel.',
        options: [
          { name: 'panel_id', type: 'String', required: true, description: 'Target panel ID.' },
          { name: 'dept_id', type: 'String', required: true, description: 'Department ID to remove.' }
        ]
      }
    ]
  },
  {
    id: 'utility',
    name: '8. Utility',
    description: 'General server utility, Join-to-Create voice management, localization, and information lookups.',
    commands: [
      {
        name: '/jtc setup',
        description: 'Initial configuration for Join-to-Create dynamic voice channels.',
        options: [
          { name: 'base_voice', type: 'Channel', required: true, description: 'The master voice channel users join to create their own room.' },
          { name: 'category', type: 'Channel', required: true, description: 'Category where dynamic voice channels will be created.' },
          { name: 'panel_channel', type: 'Channel', required: true, description: 'Text channel where the JTC management panel will be sent.' },
          { name: 'name_format', type: 'String', required: false, description: 'Custom naming template for created channels.' }
        ]
      },
      { name: '/jtc disable', description: 'Disable JTC functionality and clear configuration.', options: [] },
      { name: '/jtc panel', description: 'Send or update the JTC management UI panel in the configured channel.', options: [] },
      { name: '/language available', description: 'List all supported languages (en, de, es, fr).', options: [] },
      { name: '/language current', description: 'Show your active language setting.', options: [] },
      {
        name: '/language set',
        description: 'Change your language preference.',
        options: [
          { name: 'language', type: 'String', required: true, description: 'Choices: English, Deutsch, Español, Français.' }
        ]
      },
      { name: '/ping', description: 'Check bot websocket latency and Discord API response times.', options: [] },
      {
        name: '/utils avatar',
        description: "View a user's full-size avatar.",
        options: [
          { name: 'user', type: 'User', required: false, description: 'Target user.' }
        ]
      },
      {
        name: '/utils banner',
        description: "View a user's profile banner.",
        options: [
          { name: 'user', type: 'User', required: false, description: 'Target user.' }
        ]
      },
      {
        name: '/utils steam',
        description: 'Look up a Steam user profile.',
        options: [
          { name: 'username', type: 'String', required: true, description: 'Steam username or custom profile URL.' }
        ]
      },
      {
        name: '/utils userinfo',
        description: 'View detailed Discord account and guild member info.',
        options: [
          { name: 'user', type: 'User', required: false, description: 'Target user.' }
        ]
      },
      {
        name: '/utils whois',
        description: 'Look up any Discord user by their ID.',
        options: [
          { name: 'user_id', type: 'String', required: true, description: 'Discord User ID.' }
        ]
      },
      {
        name: '/utils roleinfo',
        description: 'View detailed information about a server role.',
        options: [
          { name: 'role', type: 'Role', required: true, description: 'Target role.' }
        ]
      },
      { name: '/utils serverinfo', description: 'View detailed server statistics, boost status, and info.', options: [] },
      {
        name: '/utils help',
        description: 'View interactive command help.',
        options: [
          { name: 'command', type: 'String', required: false, description: 'Specific command name (supports autocomplete).' }
        ]
      },
      { name: '/utils support', description: 'Get the official bot support server invite link.', options: [] },
      { name: '/utils stats', description: 'View bot uptime, memory usage, and global system statistics.', options: [] }
    ]
  },
  {
    id: 'xp',
    name: '9. XP & Engagement',
    description: 'Gamification features, leveling, quests, achievements, and peer recognition.',
    commands: [
      { name: '/achievements', description: 'View your unlocked achievements and available server achievements.', options: [] },
      { name: '/prestige', description: 'Trade in your max level to gain a prestige rank and exclusive perks/rewards.', options: [] },
      { name: '/quests', description: 'View active engagement quests (e.g., message goals, voice time goals) and track your current progress.', options: [] },
      {
        name: '/thanks',
        description: 'Give thanks and reputation points to another user for being helpful.',
        options: [
          { name: 'user', type: 'User', required: true, description: 'The user to thank.' },
          { name: 'reason', type: 'String', required: false, description: 'Reason for thanking them.' }
        ]
      },
      {
        name: '/xp rank',
        description: "View your or another user's visual XP rank card.",
        options: [
          { name: 'user', type: 'User', required: false, description: 'Target user.' }
        ]
      },
      {
        name: '/xp leaderboard',
        description: "View the server's top XP leaderboard.",
        options: [
          { name: 'page', type: 'Integer', required: false, description: 'Page number to view.' }
        ]
      },
      { name: '/xp configuration', description: "View the server's XP multipliers, voice XP rates, and role rewards.", options: [] },
      { name: '/xp card', description: 'Customize the visual colors and aesthetics of your rank card.', options: [] }
    ]
  }
];

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCategories = useMemo(() => {
    return COMMAND_CATEGORIES.map(category => {
      const matchesCategory = selectedCategory === 'all' || category.id === selectedCategory;
      if (!matchesCategory) return null;

      const filteredCommands = category.commands.filter(cmd => {
        const query = searchQuery.toLowerCase();
        return (
          cmd.name.toLowerCase().includes(query) ||
          cmd.description.toLowerCase().includes(query) ||
          cmd.options.some(opt => opt.name.toLowerCase().includes(query) || opt.description.toLowerCase().includes(query))
        );
      });

      if (filteredCommands.length === 0) return null;

      return {
        ...category,
        commands: filteredCommands
      };
    }).filter(Boolean) as Category[];
  }, [selectedCategory, searchQuery]);

  return (
    <main className="flex-1 bg-black text-neutral-100 font-mono">
      {/* Header Section */}
      <section className="border-b border-white/5 bg-black py-16 px-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center gap-2 text-[#5E5CE6] text-xs uppercase tracking-widest font-semibold">
              <Terminal className="w-4 h-4" />
              <span>SYSTEM COMMAND MATRIX</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white uppercase font-sans">
              Pegasus Bot Commands
            </h1>
            <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-sans">
              Comprehensive reference for all slash commands, subcommands, and configuration options available in the Pegasus Discord Bot hierarchy.
            </p>
          </div>

          {/* Rule of Three Minimalism Metric / Feature Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/5">
            <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 rounded-none space-y-3">
              <Terminal className="w-5 h-5 text-[#5E5CE6]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">9 Modular Categories</h3>
              <p className="text-xs text-neutral-400 leading-normal font-sans">
                Fully modular architecture spanning administration, economy, moderation, ticket support, and automated utilities.
              </p>
            </div>
            <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 rounded-none space-y-3">
              <Shield className="w-5 h-5 text-[#5E5CE6]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Advanced AutoMod V2</h3>
              <p className="text-xs text-neutral-400 leading-normal font-sans">
                Robust threat mitigation featuring regex word filtering, mention spam thresholds, and the Quarantine Vault.
              </p>
            </div>
            <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 rounded-none space-y-3">
              <Settings className="w-5 h-5 text-[#5E5CE6]" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">Extensive Configuration</h3>
              <p className="text-xs text-neutral-400 leading-normal font-sans">
                Dynamic server customization with customizable ticket panels, reaction roles, rich embeds, and multi-language support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Command Matrix Display */}
      <section className="py-12 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Sidebar Navigation & Search */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider block font-sans font-semibold">
                Search Commands
              </label>
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Search name, param, desc..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-none pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:border-[#5E5CE6] focus:outline-none transition-colors backdrop-blur-md"
                />
              </div>
            </div>

            {/* Category Navigation List */}
            <div className="space-y-2">
              <label className="text-xs text-neutral-400 uppercase tracking-wider block font-sans font-semibold">
                Categories
              </label>
              <div className="flex flex-col space-y-1 border border-white/5 bg-white/[0.01] backdrop-blur-md p-2 rounded-none">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`flex items-center justify-between px-3 py-2 text-xs rounded-none transition-colors text-left ${
                    selectedCategory === 'all'
                      ? 'border-l-2 border-[#5E5CE6] bg-white/[0.04] text-white font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                  }`}
                >
                  <span>All Categories</span>
                  <Layers className="w-3.5 h-3.5 opacity-50" />
                </button>
                {COMMAND_CATEGORIES.map((cat) => {
                  const isActive = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center justify-between px-3 py-2 text-xs rounded-none transition-colors text-left ${
                        isActive
                          ? 'border-l-2 border-[#5E5CE6] bg-white/[0.04] text-white font-bold'
                          : 'text-neutral-400 hover:text-white hover:bg-white/[0.02]'
                      }`}
                    >
                      <span className="truncate">{cat.name}</span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-[#5E5CE6] translate-x-0.5' : 'opacity-40'}`} />
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Right Content Area / Data Tables */}
          <div className="flex-1 space-y-12">
            {filteredCategories.length === 0 ? (
              <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md p-12 rounded-none text-center space-y-3">
                <Hash className="w-8 h-8 text-neutral-600 mx-auto" />
                <h3 className="text-base font-bold text-white uppercase tracking-wider">No matching commands found</h3>
                <p className="text-xs text-neutral-400 font-sans max-w-sm mx-auto">
                  No commands matched your search query &ldquo;{searchQuery}&rdquo; in the selected category. Try adjusting your filters.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                  className="mt-4 border border-white/10 bg-white/[0.02] hover:border-[#5E5CE6] hover:text-[#5E5CE6] transition-all px-4 py-2 text-xs uppercase tracking-wider rounded-none"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div key={category.id} className="space-y-6">
                  {/* Category Header */}
                  <div className="border-b border-white/5 pb-4 space-y-2">
                    <h2 className="text-xl font-bold text-white uppercase tracking-wider font-sans flex items-center gap-2">
                      <span className="w-1.5 h-5 bg-[#5E5CE6] inline-block" />
                      {category.name}
                    </h2>
                    <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                      {category.description}
                    </p>
                  </div>

                  {/* Clean, Flat, Straight-Lined Data Table */}
                  <div className="border border-white/5 bg-white/[0.01] backdrop-blur-md rounded-none overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/5 bg-black/40 text-neutral-400 uppercase tracking-wider font-sans text-[11px] font-bold">
                          <th className="py-3.5 px-4 w-52">Command</th>
                          <th className="py-3.5 px-4 w-72">Description</th>
                          <th className="py-3.5 px-4">Parameters / Options</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {category.commands.map((cmd, idx) => (
                          <tr key={idx} className="bg-transparent group">
                            <td className="py-4 px-4 align-top font-mono font-semibold text-white">
                              <span className="bg-white/[0.03] border border-white/10 px-2 py-1 inline-block rounded-none text-[#5E5CE6]">
                                {cmd.name}
                              </span>
                            </td>
                            <td className="py-4 px-4 align-top text-neutral-300 font-sans leading-relaxed text-xs">
                              {cmd.description}
                            </td>
                            <td className="py-4 px-4 align-top space-y-2">
                              {cmd.options.length === 0 ? (
                                <span className="text-neutral-500 italic text-[11px] font-sans">None</span>
                              ) : (
                                <div className="space-y-1.5">
                                  {cmd.options.map((opt, optIdx) => (
                                    <div key={optIdx} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-[11px]">
                                      <div className="flex items-center gap-1.5 flex-shrink-0">
                                        <span className={`font-mono px-1.5 py-0.5 rounded-none border ${
                                          opt.required
                                            ? 'bg-[#5E5CE6]/10 border-[#5E5CE6]/30 text-[#5E5CE6]'
                                            : 'bg-white/[0.02] border-white/10 text-neutral-400'
                                        }`}>
                                          {opt.required ? `<${opt.name}>` : `[${opt.name}]`}
                                        </span>
                                        <span className="text-neutral-500 font-mono text-[10px]">({opt.type})</span>
                                      </div>
                                      <span className="text-neutral-300 font-sans leading-normal">{opt.description}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </section>
    </main>
  );
}
