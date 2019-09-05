export const treeMixins = {
    methods: {
        csTree: function (item) {
            var data = [
                {
                    id: item.customerSegment.id,
                    name: item.customerSegment.name,
                    children: [
                        {
                            id: item.customerSegment.idea.id,
                            name: item.customerSegment.idea.name
                        }
                    ]
                }
            ];
            return data;
        },
        personaTree: function (item) {
            var data = [{
                id: item.persona.id,
                name: item.persona.name,
                children: [
                    {
                        id: item.persona.customerSegment.id,
                        name: item.persona.customerSegment.name,
                        children: [
                            {
                                id: item.persona.customerSegment.idea.id,
                                name: item.persona.customerSegment.idea.name
                            }
                        ]
                    }
                ]
            }];
            return data;
        },
        vpTree: function (item) {
            var data = [{
                id: item.valueProposition.id,
                name: item.valueProposition.description,
                children: [{
                    id: item.valueProposition.persona.id,
                    name: item.valueProposition.persona.name,
                    children: [
                        {
                            id: item.valueProposition.persona.customerSegment.id,
                            name: item.valueProposition.persona.customerSegment.name,
                            children: [
                                {
                                    id: item.valueProposition.persona.customerSegment.idea.id,
                                    name: item.valueProposition.persona.customerSegment.idea.name
                                }
                            ]
                        }
                    ]
                }]
            }];
            return data;
        },
        canvasTree: function (item) {
            var data = [{
                id: item.businessCanvas.id,
                name: item.businessCanvas.form.name,
                children: [{
                    id: item.businessCanvas.valueProposition.id,
                    name: item.businessCanvas.valueProposition.description,
                    children: [{
                        id: item.businessCanvas.valueProposition.persona.id,
                        name: item.businessCanvas.valueProposition.persona.name,
                        children: [
                            {
                                id: item.businessCanvas.valueProposition.persona.customerSegment.id,
                                name: item.businessCanvas.valueProposition.persona.customerSegment.name,
                                children: [
                                    {
                                        id: item.businessCanvas.valueProposition.persona.customerSegment.idea.id,
                                        name: item.businessCanvas.valueProposition.persona.customerSegment.idea.name
                                    }
                                ]
                            }
                        ]
                    }]
                }]
            }];
            return data;
        },
        expTree: function (item) {
            var data = [{
                id: item.experiment.id,
                name: item.experiment.form.name,
                children: [{
                    id: item.experiment.valueProposition.id,
                    name: item.experiment.valueProposition.description,
                    children: [{
                        id: item.experiment.valueProposition.persona.id,
                        name: item.experiment.valueProposition.persona.name,
                        children: [
                            {
                                id: item.experiment.valueProposition.persona.customerSegment.id,
                                name: item.experiment.valueProposition.persona.customerSegment.name,
                                children: [
                                    {
                                        id: item.experiment.valueProposition.persona.customerSegment.idea.id,
                                        name: item.experiment.valueProposition.persona.customerSegment.idea.name
                                    }
                                ]
                            }
                        ]
                    }]
                }]
            }];
            return data;
        },
        competitorTree: function (item) {
            var data = [{
                id: item.competitor.id,
                name: item.competitor.name,
                children: [{
                    id: item.competitor.valueProposition.id,
                    name: item.competitor.valueProposition.description,
                    children: [{
                        id: item.competitor.valueProposition.persona.id,
                        name: item.competitor.valueProposition.persona.name,
                        children: [
                            {
                                id: item.competitor.valueProposition.persona.customerSegment.id,
                                name: item.competitor.valueProposition.persona.customerSegment.name,
                                children: [
                                    {
                                        id: item.competitor.valueProposition.persona.customerSegment.idea.id,
                                        name: item.competitor.valueProposition.persona.customerSegment.idea.name
                                    }
                                ]
                            }
                        ]
                    }]
                }]
            }];
            return data;
        }
    }
}
