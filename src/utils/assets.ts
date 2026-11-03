const base = import.meta.env.BASE_URL;

export function assetUrl(path: string) {
  if (!path.startsWith('/')) return path;
  return `${base}${path.slice(1)}`;
}

export function assetSrcSet(srcSet: string) {
  return srcSet
    .split(',')
    .map(entry => {
      const [path, descriptor] = entry.trim().split(/\s+/, 2);
      return `${assetUrl(path)} ${descriptor}`;
    })
    .join(', ');
}
