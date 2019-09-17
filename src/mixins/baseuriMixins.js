export const baseuriMixins = {
    data() {
        return {
            // storageUri: "http://103.23.22.223/start.mikti.id/storage/app",
            storageUri: "http://localhost/start.mikti.id/storage/app",
            baseUriTalent: {
                idea: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas",
                customersegment: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments",
                persona: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas",
                valueproposition: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas/" +
                    this.$route.params.personaId +
                    "/value-propositions",
                canvas: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas/" +
                    this.$route.params.personaId +
                    "/value-propositions/" +
                    this.$route.params.valuepropositionId +
                    "/business-canvases",
                experiment: "/talent/as-team-member/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas/" +
                    this.$route.params.personaId +
                    "/value-propositions/" +
                    this.$route.params.valuepropositionId +
                    "/experiments"
            },
            baseUriMentor: {
                persona: "/talent/as-programme-mentor/" +
                    this.$route.params.programId +
                    "/teams/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas",
                canvas: "/talent/as-programme-mentor/" +
                    this.$route.params.programId +
                    "/teams/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas/" +
                    this.$route.params.personaId +
                    "/value-propositions/" +
                    this.$route.params.valuepropositionId +
                    "/business-canvases",
                experiment: "/talent/as-programme-mentor/" +
                    this.$route.params.programId +
                    "/teams/" +
                    this.$route.params.teamId +
                    "/ideas/" +
                    this.$route.params.ideaId +
                    "/customer-segments/" +
                    this.$route.params.customersegmentId +
                    "/personas/" +
                    this.$route.params.personaId +
                    "/value-propositions/" +
                    this.$route.params.valuepropositionId +
                    "/experiments"
            }
        }
    }
}