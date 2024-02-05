import React from "react";
import { tx } from "@transifex/native";
import { getServerSideTranslations } from "src/i18n";

import App from "./app";

tx.init({
  token: process.env.TX_NATIVE_PUBLIC_TOKEN,
  filterStatus: "reviewed",
});

interface IProps {
  params: {
    locale: string;
  };
}

export default async (props: IProps) => {
  const params = await getData(props.params.locale);
  return <App {...params} />;
};

// get the list of paths based on locales from the API
const getPathSlugs = async () => {
  const languages = await tx.getLanguages();

  // We fetched locales from our API once at build time
  return languages
    .filter((language) => language.code !== "en")
    .map((language) => ({
      locale: language.code.replace("_", "-").toLocaleLowerCase(),
    }));
};

export async function generateStaticParams() {
  return await getPathSlugs();
}

// get the locales information from the API
async function getData(locale) {
  const languages = (await tx.getLanguages()).filter(
    (language) => language.code !== "en"
  );

  const locales = languages.map((language) => language.code);
  const data = await getServerSideTranslations({ locale, locales });

  return {
    ...data,
    languages: languages.map((language) => ({
      ...language,
      code: language.code.replace("_", "-").toLocaleLowerCase(),
    })),
    locale,
  };
}
