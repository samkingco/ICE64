export const originalIds = Array.from({ length: 16 }, (_, i) => i + 1);

export const editionIds = Array.from({ length: 16 }, (_, i) => i + 101);

export const allIds = [...originalIds, ...editionIds];
export const modalIds = [
  ...originalIds,
  ...editionIds.map((i) => i - 100 + 16),
];

export const joinedIds = originalIds.reduce((list: number[], id) => {
  return [...list, id, id + 100];
}, []);

export function getOriginalId(id: number) {
  return id > 100 ? id - 100 : id;
}

export function getEditionId(id: number) {
  return id > 100 ? id : id + 100;
}

export function isEdition(id: number) {
  return id > 100;
}

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

export function wrapOriginals(v: number) {
  return wrap(originalIds[0], originalIds[0] + originalIds.length, v);
}

export function wrapEditions(v: number) {
  return wrap(editionIds[0], editionIds[0] + editionIds.length, v);
}
