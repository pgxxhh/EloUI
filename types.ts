
export type AuthMode = 'LOGIN' | 'SIGNUP';
export type AuthRole = 'STUDENT' | 'COACH';
export type OnboardingStatus = 'NOT_STARTED' | 'SUBMITTED' | 'APPROVED';

export type AppView = 
  | 'LANDING'
  | 'STUDENT_HOME' 
  | 'MATCHING' 
  | 'SESSION' 
  | 'SESSION_PROCESSING'
  | 'REVIEW' 
  | 'COACH_LANDING'
  | 'COACH_APPLY'
  | 'COACH_STATUS'
  | 'COACH_ONBOARDING_SUCCESS'
  | 'COACH_DASHBOARD' 
  | 'COACH_ONBOARDING'
  | 'BILLING'
  | 'AUTH'
  | 'HISTORY'
  | 'HISTORY_DETAIL'
  | 'ADMIN'
  | 'FIND_COACH'
  | 'COACH_HUB'
  | 'LESSON_REVIEW'
  | 'PRE_CHECK'
  | 'COACH_EARNINGS'
  | 'EMAIL_VERIFICATION'
  | 'TRIAL_SUCCESS'
  | 'POST_TRIAL_UPGRADE'
  | 'ABOUT'
  | 'LIVE_LESSON';

export type EarningStatus = 'SETTLED_UNPAID' | 'IN_PAYOUT' | 'PAID';
export type PayoutStatus = 'PENDING' | 'PROCESSING' | 'PAID' | 'FAILED';

export interface EarningRecord {
  id: string;
  sourceType: 'LESSON' | 'BONUS';
  sourceId: string;
  status: EarningStatus;
  billableMinutes: number;
  ratePerMinuteCents: number;
  grossAmountCents: number;
  currency: string;
  earnedAt: string;
  paidAt?: string;
  note?: string;
}

export interface PayoutBatch {
  id: string;
  status: PayoutStatus;
  earningCount: number;
  grossAmountCents: number;
  paidAmountCents: number;
  currency: string;
  scheduledFor: string;
  paidAt?: string;
  failureReason?: string;
}

export type LessonType = 'INSTANT' | 'SCHEDULED';
export type LessonStatus = 'REQUESTED' | 'CONFIRMED' | 'LIVE' | 'ENDED' | 'CANCELLED';

export interface Coach {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  headline: string;
  fullBio?: string;
  specialties: string[];
  teachingStyles: string[];
  languages: string[];
  location?: string;
  timezone?: string;
  isOnline: boolean;
  isBusy?: boolean;
  nextSlot?: string;
  rating?: number;
  lessonCount?: number;
  introAudioUrl?: string;
  introAudioDuration?: string;
}

export interface LessonRequest {
  id: string;
  type: LessonType;
  coachId: string;
  coachName: string;
  coachAvatar?: string;
  learnerId: string;
  learnerName: string;
  duration: 15 | 30 | 45 | 60;
  topic: string;
  note?: string;
  scheduledTime?: string;
  status: LessonStatus;
  createdAt: string;
}

export interface SessionRecord {
  id: string;
  date: string;
  coachName: string;
  scenarioTitle: string;
  duration: string;
  score?: number;
  audioUrl?: string;
  summary?: string;
  transcription: {
    speaker: 'COACH' | 'STUDENT';
    text: string;
    pinyin?: string;
    translation?: string;
    timestamp?: string;
  }[];
  feedback: {
    overall?: string;
    eloMoments: {
      original: string;
      upgrade: string;
      pinyin?: string;
      explanation?: string;
    }[];
    nextSteps: {
      title: string;
      description: string;
    }[];
  };
}

export interface Scenario {
  id: string;
  title: string;
  chineseTitle: string;
  description: string;
  level: 'HSK 2' | 'HSK 3' | 'HSK 4';
  updatedAt: string;
  outcome: string;
  keywords: string[];
  recommendationTag?: string;
  activeCoaches: number;
  duration: string;
}
