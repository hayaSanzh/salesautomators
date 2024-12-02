const Pipedrive = require('pipedrive');

const defaultClient = new Pipedrive.ApiClient();
let apiToken = defaultClient.authentications['api_key'];
apiToken.apiKey = '9560741c003795e88a1279a3cb38ae1e54f15125';
const api = new Pipedrive.LeadsApi(defaultClient);


// GET method for all leads
const getLeads = async (req, res) => {
    try {
        const data = await api.getLeads();
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ 'message': err.message });
    }
}


// GET method for particular lead
const getLead = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await api.getLead(id);
        res.status(200).json(data);
    } catch (err) {
        res.status(404).json({ 'message': err.message });
    }
};


// POST method for adding lead
const postLead = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber } = JSON.parse(JSON.stringify(req.body));

        // Creating a person
        const personApi = new Pipedrive.PersonsApi(defaultClient);
        let personOpts = Pipedrive.NewPerson.constructFromObject({
            name: firstName + ' ' + lastName,
            email: [Pipedrive.BasicPersonEmail.constructFromObject({ value: email, label: "work" })],
            phone: [Pipedrive.BasicPersonEmail.constructFromObject({ value: phoneNumber, label: "work" })]
        });

        const { data } = await personApi.addPerson(personOpts);
        const person = data;

        // Creating a label using person
        const leadsApi = new Pipedrive.LeadsApi(defaultClient);
        let leadsOpts = Pipedrive.AddLeadRequest.constructFromObject({
            title: `${person.name}'s lead`,
            personId: person.id
        });
        const record = await leadsApi.addLead(leadsOpts);

        res.status(201).json(record);
    } catch (err) {
        console.log(err)
        res.status(500).json({ 'message': err.message });
    }
}


// DELETE method for deleting lead
const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await api.deleteLead(id);
        res.status(200).json('Lead deleted');
    } catch (err) {
        res.status(404).json({ 'message': err.message });
    }
}

const updateLead = async (req, res) => {
    try {
        const { firstName, lastName, email, phoneNumber } = JSON.parse(JSON.stringify(req.body));
        const { id } = req.params;

        // Creating a person
        const personApi = new Pipedrive.PersonsApi(defaultClient);
        let personOpts = Pipedrive.NewPerson.constructFromObject({
            name: firstName + ' ' + lastName,
            email: [Pipedrive.BasicPersonEmail.constructFromObject({ value: email, label: "work" })],
            phone: [Pipedrive.BasicPersonEmail.constructFromObject({ value: phoneNumber, label: "work" })]
        });

        const { data } = await personApi.addPerson(personOpts);
        const person = data;

        // Creating a label using person
        const leadsApi = new Pipedrive.LeadsApi(defaultClient);
        let leadsOpts = Pipedrive.UpdateLeadRequest.constructFromObject({
            title: `${person.name}'s lead`,
            personId: person.id
        });
        const record = await leadsApi.updateLead(id, leadsOpts);

        res.status(201).json(record);
    } catch (err) {
        res.status(500).json({ 'message': err.message });
    }
}

module.exports = {
    getLeads,
    getLead,
    postLead,
    deleteLead,
    updateLead
};
