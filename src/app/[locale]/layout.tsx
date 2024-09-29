import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import React from 'react';

import MSW from '@/components/MSW';
import {pretendard} from '@/lib/fonts';
import QueryProvider from '@/provider/QueryProvider';

export default async function LocaleLayout({
  children,
  params: {locale},
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${pretendard.variable}`}>
      <body>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <MSW />
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
