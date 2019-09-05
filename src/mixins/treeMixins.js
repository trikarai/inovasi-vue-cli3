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
        }
    }
}
