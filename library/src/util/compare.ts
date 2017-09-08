/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * @Author: Mehuge (mehuge@sorcerer.co.uk)
 * @Date: 2017-03-08 23:42:32
 * @Last Modified by: Mehuge (mehuge@sorcerer.co.uk)
 * @Last Modified time: 2017-03-08 23:43:16
 */

export function stricmp(a: string, b: string) {
  const normalizedA = a.toLowerCase();
  const normalizedB = b.toLowerCase();
  return normalizedA < normalizedB ? -1 : normalizedB > normalizedA ? 1 : 0;
}

export function datecmp(a: string, b: string) {
  const da = new Date(a);
  const db = new Date(b);
  return da < db ? -1 : da > db ? 1 : 0;
}
