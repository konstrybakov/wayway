import {
  DifficultyCategory,
  FrequencyCategory,
  RegisterCategory,
} from '@prisma/client'

const registerDict = {
  informal: RegisterCategory.Informal,
  formal: RegisterCategory.Formal,
  slang: RegisterCategory.Slang,
  technical: RegisterCategory.Technical,
} satisfies Record<string, RegisterCategory>

const frequencyDict = {
  common: FrequencyCategory.Common,
  uncommon: FrequencyCategory.Uncommon,
  rare: FrequencyCategory.Rare,
} as Record<string, FrequencyCategory>

const difficultyDict = {
  beginner: DifficultyCategory.Beginner,
  intermediate: DifficultyCategory.Intermediate,
  advanced: DifficultyCategory.Advanced,
} as Record<string, DifficultyCategory>
