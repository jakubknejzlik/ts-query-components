import { getCodeEditorStaticDirs } from "storybook-addon-code-editor/getStaticDirs";

/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  staticDirs: [...getCodeEditorStaticDirs(__filename)],
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
    "storybook-addon-code-editor",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
};
export default config;
