export const formatDate = (dateString: string, locale: string = 'uk-UA'): string => {
    const date = new Date(dateString);
    const diffMs = Date.now() - date.getTime();

    date.setMinutes(date.getMinutes() + date.getTimezoneOffset() * -1);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes.toString().padStart(2, '0')}`;
    }

    if (diffDays < 7) {
        const shortDaysOfWeek =
            locale === 'uk-UA'
                ? ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб']
                : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return shortDaysOfWeek[date.getDay()];
    }

    if (diffDays < 365) {
        return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
    }

    const options: Intl.DateTimeFormatOptions = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        hour: '2-digit',
        minute: '2-digit',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    };

    return date.toLocaleString(locale, options);
};