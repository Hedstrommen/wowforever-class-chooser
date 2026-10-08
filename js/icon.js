// Shared icon helper: renders an <img> for a Wowhead CDN icon,
// falling back to a neutral gem if the image fails to load.
var WowIcon = (function () {
  function icon(src, size, extra) {
    size = size || 36;
    extra = extra || "";
    return (
      '<img class="wow-icon" src="' + src + '" alt="" width="' + size +
      '" height="' + size + '" loading="lazy" style="' + extra + '"' +
      ' onerror="this.outerHTML=\'<span class=&quot;wow-icon-fallback&quot; style=&quot;width:' +
      size + 'px;height:' + size + 'px;line-height:' + size + 'px;font-size:' +
      Math.round(size * 0.55) + 'px&quot;>◆</span>\'" />'
    );
  }
  return { icon: icon };
})();
