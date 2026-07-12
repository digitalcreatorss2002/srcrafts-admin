//menuFactory.js
import { v4 as uuid } from "uuid";

export const createMenuItem = ({
  type,
  label,
  ref = null,
  url = null,
  meta = {},
}) => ({
  id: uuid(),
  type,               // STATIC | COLLECTION | CATEGORY
  label,              // fallback title
  ref,                // { model, id }
  url,                // only for STATIC
  target: "_self",
  meta,               // extensible
  children: [],
});
