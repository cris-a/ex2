import { parseStringPromise } from 'xml2js';

export const parseXML = async (xml: string) => {
  return await parseStringPromise(xml);
};
