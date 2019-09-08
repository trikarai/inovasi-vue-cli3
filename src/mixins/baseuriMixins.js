export const baseuriMixins = {
    data() {
        return {
            baseUriTalent: {
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
                    "/value-propositions"
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
                    "/personas"
            }
        }
    }
}