export function parseStickers(text: string): string {
  const stickerRegex = /\[s-([0-9]+)(?:-([0-9]+))?\]/g;
  return text.replace(stickerRegex, (_, cate, id) => {
    console.log('sticker', cate, id);
    const url_prefix = 'https://rawcdn.githack.com/Nemo1166/tch-sticker/0.0.1/webp/';
    let prefix = '';
    let url = '';
    if (id) {
      if (cate == 2) {
        prefix = 'error';
      } else {
        prefix = 'cat';
      }
      url = `${url_prefix}${prefix}-${id}.webp`;
    } else {
      url = `${url_prefix}dahayu-${cate}.webp`;
    }
    return `<img src="${url}" alt="[sticker]" class="tch-sticker">`;
  });
}