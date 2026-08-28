import { CoachingPlugin } from './types';
import { openAIPlugin } from './openai.plugin';
import { ollamaPlugin } from './ollama.plugin';
import { deepseekPlugin } from './deepseek.plugin';

const pluginRegistry: Record<string, CoachingPlugin> = {
  openai: openAIPlugin,
  ollama: ollamaPlugin,
  deepseek: deepseekPlugin,
};

export function getPlugin(id: string): CoachingPlugin {
  const plugin = pluginRegistry[id];
  if (!plugin) {
    throw new Error(`Plugin '${id}' is not registered. Available plugins: ${Object.keys(pluginRegistry).join(', ')}`);
  }
  return plugin;
}

export function getAllPlugins(): CoachingPlugin[] {
  return Object.values(pluginRegistry);
}
