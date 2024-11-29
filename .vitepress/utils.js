export function getProjectName() {
  try {
    const result = require('child_process').execSync('git rev-parse --show-toplevel').toString().trim();
    return require('path').basename(result);
  } catch (error) {
    console.error('Error getting project name:', error);
    return '';
  }
}

export function getBaseUrl() {
  const isProduction = typeof process !== 'undefined' && process.env.NODE_ENV === 'production';
  const projectName = getProjectName();
  return isProduction ? `/${projectName}/` : '';
}