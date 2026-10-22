/** Arabic article chrome; preserve the existing English/Spanish labels. */
const english = {
  views: 'views', articleViews: 'Article views', likes: 'Likes', like: 'Like this article',
  counterUnavailable: 'Engagement metrics are unavailable',
  navigation: 'Article navigation', previous: 'Previous Post', next: 'Next Post',
  related: 'Similar Blog Posts', readFull: 'Read full post',
};
const arabic: typeof english = {
  views: 'مشاهدات', articleViews: 'مشاهدات المقال', likes: 'الإعجابات', like: 'الإعجاب بهذا المقال',
  counterUnavailable: 'إحصاءات التفاعل غير متاحة',
  navigation: 'التنقل بين المقالات', previous: 'المقال السابق', next: 'المقال التالي',
  related: 'مقالات ذات صلة', readFull: 'قراءة المقال كاملاً',
};

export function articleMessages(locale: string) {
  return locale === 'ar' ? arabic : english;
}
