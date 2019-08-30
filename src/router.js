import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import LoginAdmin from "./views/LoginAdmin.vue";
import LoginTalent from "./views/LoginTalent.vue";
import SignUp from "./views/SignUp.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import ResetPassword from "./views/ResetPassword.vue";
import ActivateAccount from "./views/ActivateAccount.vue";
import NotFoundComponent from "./views/404.vue";

import Administrator from "./views/Administrator.vue";
import AdministratorDashboard from "./components/administrator/AdministratorDashboard";
import AdministratorManageAdmin from "./components/administrator/AdministratorManageAdmin";
import AdministratorManageProgram from "./components/administrator/AdministratorManageProgram";
import AdministratorManageProgramPhase from "./components/administrator/program/AdministratorProgramPhase";
import AdministratorManageProgramRegistration from "./components/administrator/program/registration/AdministratorProgramRegistration";
import AdministratorManageProgramMentoring from "./components/administrator/program/AdministratorManageProgramMentoring";
import AdministratorManageProgramCoordinator from "./components/administrator/program/AdministratorManageProgramCoordinator";
import AdministratorManageProgramMentor from "./components/administrator/program/AdministratorManageProgramMentor";
import AdministratorManageProgramTalentSearch from "./components/administrator/program/personnel/AdministratorTalentList";

import AdministratorManageCurriculum from "./components/administrator/AdministratorManageCurriculum";
import AdministratorCurriculumPhase from "./components/administrator/curriculum/AdministratorCurriculumPhase";

import AdministratorManageRegion from "./components/administrator/AdministratorManageRegion";

import AdministratorManageTrack from "./components/administrator/AdministratorManageTrack";
import AdministratorTrackManageSkill from "./components/administrator/track/AdministratorTrackSkill";

import AdministratorManageForm from "./components/administrator/AdministratorManageForm";
import AdministratorManageFormField from "./components/administrator/form/AdministratorManageFormField";
import AdministratorManageFormSection from "./components/administrator/form/AdministratorManageFormSection";

import Talent from "./views/Talent.vue";
import TalentDashboard from "./components/talent/TalentDashboard.vue";
import TalentProfile from "./components/talent/TalentProfile.vue";
import TalentProfileEducation from "./components/talent/profile/education/TalentProfileEducation.vue";
import TalentProfileWork from "./components/talent/profile/work/TalentProfileWork.vue";
import TalentProfileOrganization from "./components/talent/profile/org/TalentProfileOrganization.vue";
import TalentProfileEntrepreneurship from "./components/talent/profile/entrepreneurship/TalentProfileEntrepreneurship.vue";
import TalentProfileTraining from "./components/talent/profile/training/TalentProfileTraining.vue";
import TalentProfileSkill from "./components/talent/profile/skill/TalentProfileSkill.vue";

import TalentTeam from "./components/talent/TalentTeam.vue";
import TalentTeamProgram from "./components/talent/team/programparticipation/TalentTeamProgram";
import TalentTeamProgramRegister from "./components/talent/TalentProgrammes.vue";
import TalentTeamProgramMentoring from "./components/talent/team/programparticipation/mentoring/MentoringSession";
import TalentTeamProgramMentoringEvent from "./components/talent/team/programparticipation/mentoring/MentoringEventList";
import TalentTeamProgramMentorList from "./components/talent/team/programparticipation/mentoring/MentoringMentorList";
import TalentTeamProgramMentorSession from "./components/talent/team/programparticipation/mentoring/MentoringMentorSchedule";
import TalentTeamCreate from "./components/talent/team/TalentTeamCreate";
import TalentTeamDetail from "./components/talent/team/TalentTeamDetail";
import TalentTeamSearch from "./components/talent/team/manage/SearchTalent";
import TalentTeamIdea from "./components/talent/team/idea/TalentTeamIdea";
import TalentTeamIdeaDetail from "./components/talent/team/idea/TalentTeamIdeaDetail";
import TalentTeamIdeaCustomersegment from "./components/talent/team/idea/customersegment/TalentTeamIdeaCustomersegment";
import TalentTeamIdeaCustomersegmentPersona from "./components/talent/team/idea/customersegment/persona/TalentTeamIdeaCustomersegmentPersona";
import TalentTeamIdeaCustomersegmentPersonaValueproposition from "./components/talent/team/idea/customersegment/persona/valueproposition/TalentTeamIdeaCustomersegmentPersonaValueproposition";

import CompetitorList from "./components/talent/team/idea/customersegment/persona/valueproposition/competitor/CompetitorList";

import BusinessAnalysis from "./components/talent/team/idea/customersegment/persona/valueproposition/analysis/BusinessAnalysisList";
import BusinessAnalysisCanvas from "./components/talent/team/idea/customersegment/persona/valueproposition/analysis/components/GridCanvas";

import ExperimentFormList from "./components/talent/team/idea/customersegment/persona/valueproposition/experiment/ExperimentFormList";
import ExperimentDataList from "./components/talent/team/idea/customersegment/persona/valueproposition/experiment/ExperimentDataList";
import ExperimentDetail from "./components/talent/team/idea/customersegment/persona/valueproposition/experiment/ExperimentDetail";

import TalentFeedback from "./components/talent/TalentFeedback.vue";
import TalentProgrammes from "./components/talent/TalentProgrammes.vue";

import Coordinator from "./views/Coordinator.vue";
import CoordinatorDashboard from "./components/personnel/coordinator/CoordinatorDashboard";
import CoordinatorProgram from "./components/personnel/coordinator/program/CoordinatorProgram";
import CoordinatorProgramParticipant from "./components/personnel/coordinator/program/participant/CoordinatorProgramParticipant";

import Mentor from "./views/Mentor.vue";
import MentorDashboard from "./components/personnel/mentor/MentorDashboard";
import MentorProgram from "./components/personnel/mentor/program/MentorProgram";
import MentorProgramMentoring from "./components/personnel/mentor/program/mentoring/MentorProgramMentoring";
import MentorProgramCollaboration from "./components/personnel/mentor/program/collaboration/MentorProgramCollaboration";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: SignUp
  },
  {
    path: "/login",
    name: "Talent Login",
    meta: {
      description: "Talent"
    },
    component: LoginTalent
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword
  },
  {
    path: "/reset-password/:email/:resetPasswordCode",
    name: "Reset Password",
    component: ResetPassword
  },
  {
    path: "/activate/:email/:activationCode",
    name: "Activate Account",
    component: ActivateAccount
  },
  {
    path: "/mentor/login/",
    name: "Mentor Login",
    component: LoginTalent
  },
  {
    path: "/coordinator/login/",
    name: "Coordinator Login",
    component: LoginTalent
  },
  {
    path: "/talent",
    name: "Talent",
    component: Talent,
    children: [
      {
        path: "/talent/dashboard",
        name: "Talent Dashboard",
        component: TalentDashboard,
        meta: {
          requiresAuth: true, talentAuth: true, adminAuth: false,
          level: 0,
          text: "Dashboard"
        },
      },
      {
        path: "/talent/profile",
        name: "My Profile",
        component: TalentProfile,
        meta: {
          requiresAuth: true, talentAuth: true, adminAuth: false,
          level: 1,
          text: "Profile"
        },
      },
      {
        path: "/talent/education",
        name: "Education",
        component: TalentProfileEducation,
        meta: {
          level: 1,
          text: "Education"
        }
      },
      {
        path: "/talent/work",
        name: "Working Experiences",
        component: TalentProfileWork,
        meta: {
          level: 1,
          text: "Work"
        }
      },
      {
        path: "/talent/organization",
        name: "Organization Experiences",
        component: TalentProfileOrganization,
        meta: {
          level: 1,
          text: "Organization"
        }
      },
      {
        path: "/talent/entrepreneurship",
        name: "Entrepreneurship Experiences",
        component: TalentProfileEntrepreneurship,
        meta: {
          level: 1,
          text: "Entrepreneurship"
        }
      },
      {
        path: "/talent/training",
        name: "Training Experiences",
        component: TalentProfileTraining,
        meta: {
          level: 1,
          text: "Training"
        }
      },
      {
        path: "/talent/skill",
        name: "Skill",
        component: TalentProfileSkill,
        meta: {
          level: 1,
          text: "Skill"
        }
      },
      {
        path: "/talent/team",
        name: "Team",
        component: TalentTeam,
        meta: {
          level: 1,
          text: "Team"
        }
      },
      {
        path: "/talent/team/:membershipId",
        name: "Team Detail",
        component: TalentTeamDetail,
        meta: {
          requiresAuth: true, talentAuth: true, adminAuth: false,
          level: 2,
          text: "Team Detail"
        }
      },
      {
        path: "/talent/team/:membershipId/search",
        name: "Talent Search",
        component: TalentTeamSearch,
        meta: {
          requiresAuth: true, talentAuth: true, adminAuth: false,
          level: 3,
          text: "Search Talent"
        }
      },
      {
        path: "/talent/team/:teamId/participation",
        name: "Team Program Participation",
        component: TalentTeamProgram,
        meta: {
          level: 2,
          text: "Participation List"
        }
      },
      {
        path: "/talent/team/:teamId/participation/register",
        name: "Team Register Program",
        component: TalentTeamProgramRegister,
        meta: {
          level: 3,
          text: "Program List"
        }
      },
      {
        path: "/talent/team/:teamId/participation/:participationId/mentoring",
        name: "Team Mentoring Session",
        component: TalentTeamProgramMentoring,
        meta: {
          level: 3,
          text: "Mentoring Session"
        }
      },
      {
        path: "/talent/team/:teamId/participation/:participationId/mentoring-event",
        name: "Mentoring Event List",
        component: TalentTeamProgramMentoringEvent,
        meta: {
          level: 4,
          text: "Mentoring Event List"
        }
      },
      {
        path: "/talent/team/:teamId/participation/:participationId/mentoring-event/:eventId/mentor-list",
        name: "Mentor List",
        component: TalentTeamProgramMentorList,
        meta: {
          level: 5,
          text: "Mentor List"
        }
      },
      {
        path: "/talent/team/:teamId/participation/:participationId/mentoring-event/:eventId/mentor/:mentorId/session",
        name: "Mentor Sessions",
        component: TalentTeamProgramMentorSession,
        meta: {
          level: 6,
          text: "Mentor Sessions"
        }
      },
      {
        path: "/talent/team/:teamId/idea",
        name: "Idea",
        component: TalentTeamIdea,
        meta: {
          level: 2,
          text: "Idea List"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId",
        name: "Idea Detail",
        component: TalentTeamIdeaDetail,
        meta: {
          level: 3,
          text: "Idea"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId",
        name: "Customer Segment Detail",
        component: TalentTeamIdeaCustomersegment,
        meta: {
          level: 4,
          text: "Customer Segment"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId",
        name: "Persona Detail",
        component: TalentTeamIdeaCustomersegmentPersona,
        meta: {
          level: 5,
          text: "Persona"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId",
        name: "Value Proposition",
        component: TalentTeamIdeaCustomersegmentPersonaValueproposition,
        meta: {
          level: 6,
          text: "Value Proposition"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/analysis",
        name: "Business Analysis",
        component: BusinessAnalysis,
        meta: {
          level: 7,
          text: "Business Analysis"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/analysis/:formId",
        name: "Business Analysis Canvas",
        component: BusinessAnalysisCanvas,
        meta: {
          level: 8,
          text: "Canvas"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment",
        name: "Experiment Form",
        component: ExperimentFormList,
        meta: {
          level: 7,
          text: "Experiment Form"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment/:formId",
        name: "Experiment Data",
        component: ExperimentDataList,
        meta: {
          level: 8,
          text: "Experiment List"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/experiment-detail/:experimentId",
        name: "Experiment Detail",
        component: ExperimentDetail,
        meta: {
          level: 9,
          text: "Experiment Detail"
        }
      },
      {
        path: "/talent/team/:teamId/idea/:ideaId/customersegment/:customersegmentId/persona/:personaId/vp/:valuepropositionId/competitor",
        name: "Competitor",
        component: CompetitorList,
        meta: {
          level: 7,
          text: "Competitor List"
        }
      },
      {
        path: "/talent/create/team",
        name: "Create Team",
        component: TalentTeamCreate,
        meta: {
          level: 2,
          text: "Create Team"
        }
      },
      {
        path: "/talent/program",
        name: "Available Program",
        component: TalentProgrammes,
        meta: {
          level: 1,
          text: "Program"
        }
      },
      {
        path: "/talent/feedback",
        name: "Feedback",
        component: TalentFeedback,
        meta: {
          level: 1,
          text: "Feedback"
        }
      }

    ]
  },
  {
    path: "/administrator/login",
    name: "Administrator Login",
    component: LoginAdmin
  },
  {
    path: "/administrator",
    name: "Administrator",
    component: Administrator,
    meta: { requiresAuth: true, talentAuth: false, adminAuth: true },
    children: [
      {
        name: "Administrator Dashboard",
        path: "/administrator/dashboard",
        component: AdministratorDashboard,
        meta: { requiresAuth: true, talentAuth: false, adminAuth: true }
      },
      {
        name: "Manage Admin",
        path: "/administrator/admin",
        component: AdministratorManageAdmin,
        meta: { requiresAuth: true, talentAuth: false, adminAuth: true }
      },
      {
        name: "Manage Program",
        path: "/administrator/program",
        component: AdministratorManageProgram
      },
      {
        name: "View Program Phase",
        path: "/administrator/program/:programId/phase-plan",
        component: AdministratorManageProgramPhase
      },
      {
        name: "View Program Mentoring",
        path: "/administrator/program/:programId/mentoring",
        component: AdministratorManageProgramMentoring
      },
      {
        name: "View Program Registration",
        path: "/administrator/program/:programId/registration",
        component: AdministratorManageProgramRegistration
      },
      {
        name: "View Program Mentor",
        path: "/administrator/program/:programId/mentor",
        component: AdministratorManageProgramMentor
      },
      {
        name: "View Program Coordinator",
        path: "/administrator/program/:programId/coordinator",
        component: AdministratorManageProgramCoordinator
      },
      {
        name: "Coordinator Search",
        path: "/administrator/program/:programId/coordinator/search",
        component: AdministratorManageProgramTalentSearch
      },
      {
        name: "Mentor Search",
        path: "/administrator/program/:programId/mentor/search",
        component: AdministratorManageProgramTalentSearch
      },
      {
        name: "Manage Curriculum",
        path: "/administrator/curriculum",
        component: AdministratorManageCurriculum
      },
      {
        name: "Manage Curriculum Phase",
        path: "/administrator/curriculum/:curriculumId/phase-plan",
        component: AdministratorCurriculumPhase
      },
      {
        name: "Manage Region",
        path: "/administrator/region",
        component: AdministratorManageRegion
      },
      {
        name: "Manage Track",
        path: "/administrator/track",
        component: AdministratorManageTrack
      },
      {
        name: "Manage Skill",
        path: "/administrator/track/:trackId/skill-reference",
        component: AdministratorTrackManageSkill
      },
      {
        name: "Manage Form",
        path: "/administrator/form",
        component: AdministratorManageForm
      },
      {
        name: "Manage Form Field",
        path: "/administrator/form/:formId/field",
        component: AdministratorManageFormField
      },
      {
        name: "Manage Form Section",
        path: "/administrator/form/:formId/section",
        component: AdministratorManageFormSection
      },
    ]
  },
  {
    path: "/coordinator",
    name: "Coordinator",
    component: Coordinator,
    children: [
      {
        path: "/coordinator/dashboard",
        name: "Coordinator Dashboard",
        component: CoordinatorDashboard
      },
      {
        path: "/coordinator/profile",
        name: "Coordinator Profile",
        component: TalentProfile
      },
      {
        path: "/coordinator/program",
        name: "Coordinatorship Program",
        component: CoordinatorProgram
      },
      {
        path: "/coordinator/program/:programId/participant",
        name: "Coordinator Program Participant",
        component: CoordinatorProgramParticipant
      },
    ]
  },
  {
    path: "/mentor",
    name: "Mentor",
    component: Mentor,
    children: [
      {
        path: "/mentor/dashboard",
        name: "Mentor Dashboard",
        component: MentorDashboard
      },
      {
        path: "/mentor/profile",
        name: "Mentor Profile",
        component: TalentProfile
      },
      {
        path: "/mentor/program",
        name: "Mentorship Program",
        component: MentorProgram
      },
      {
        path: "/mentor/program/:programId/mentoring",
        name: "Mentoring Session",
        component: MentorProgramMentoring
      },
      {
        path: "/mentor/program/:programId/collaboration",
        name: "Collaborations List",
        component: MentorProgramCollaboration
      },
    ]
  },
  { path: '*', component: NotFoundComponent }
]

const router = new Router({
  routes,
  mode: "history",
  base: process.env.BASE_URL,
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
    if (!authUser || !authUser.token) {
      next({ path: '/login' })
    }
    else if (to.meta.adminAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.role_id === 'ADMIN') {
        next()
      } else {
        next('/talent/dashboard')
      }
    } else if (to.meta.talentAuth) {
      const authUser = JSON.parse(window.localStorage.getItem('lbUser'))
      if (authUser.role_id === 'TALENT') {
        next()
      } else {
        next('/administrator/dashboard')
      }
    }
  } else {
    next()
  }
})

export default router;