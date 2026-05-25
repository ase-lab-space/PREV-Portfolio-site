import { ROLES, type Role } from "../data/spaceSkillStandard";

export type RoleMatch = {
  role: Role;
  score: number;
  skillMatch: number;
  gyomuMatch: number;
  totalDefined: number;
};

export function recommendRoles(
  spaceSkills: string[],
  gyomu: string[],
  topN = 3
): RoleMatch[] {
  return ROLES
    .map(role => {
      if (role.relatedSkillIds.length === 0 && role.relatedGyomuIds.length === 0) {
        return { role, score: 0, skillMatch: 0, gyomuMatch: 0, totalDefined: 0 };
      }
      const skillMatch = spaceSkills.filter(id => role.relatedSkillIds.includes(id)).length;
      const gyomuMatch = gyomu.filter(id => role.relatedGyomuIds.includes(id)).length;
      const totalDefined = role.relatedSkillIds.length + role.relatedGyomuIds.length;
      const score = (skillMatch + gyomuMatch) / totalDefined;
      return { role, score, skillMatch, gyomuMatch, totalDefined };
    })
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
