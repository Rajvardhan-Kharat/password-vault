'use client';

import { useState } from 'react';
import { Copy, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

interface VaultItemProps {
  item: {
    _id: string;
    title: string;
    username: string;
    password: string;
    url?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
  };
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
}

export default function VaultItem({ item, onEdit, onDelete }: VaultItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyPassword = () => copyToClipboard(item.password);
  const copyUsername = () => copyToClipboard(item.username);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {item.title}
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-colors"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(item._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {/* Username */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">
            Username:
          </span>
          <span className="flex-1 text-gray-900 dark:text-white font-mono text-sm">
            {item.username}
          </span>
          <button
            onClick={copyUsername}
            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <Copy size={14} />
          </button>
        </div>

        {/* Password */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">
            Password:
          </span>
          <span className="flex-1 text-gray-900 dark:text-white font-mono text-sm">
            {showPassword ? item.password : '•'.repeat(12)}
          </span>
          <div className="flex space-x-1">
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
            <button
              onClick={copyPassword}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <Copy size={14} />
            </button>
          </div>
        </div>

        {/* URL */}
        {item.url && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 w-20">
              URL:
            </span>
            <a
              href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm truncate"
            >
              {item.url}
            </a>
            <a
              href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        )}

        {/* Notes */}
        {item.notes && (
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400 block mb-1">
              Notes:
            </span>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {item.notes}
            </p>
          </div>
        )}
      </div>

      {copied && (
        <div className="mt-3 text-sm text-green-600 dark:text-green-400">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
}
