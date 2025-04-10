// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

contract MentorAgent {
    uint256 public agentCount;
    uint256[] public agentIds;

    struct AgentContributor {
        address contributor;
        uint256 contributionRate; // 10000 = 100%
    }

    struct ContributorSnapshot {
        uint256 timestamp;
        AgentContributor[] contributors;
    }

    struct PaymentRecord {
        uint256 timestamp;
        uint256 agentId;
        uint256 amount;
    }

    struct AgentMetadata {
        string name;
        string title;
        string industry;
        string description;
        string country;
        string level;
        uint256 minSalary;
        uint256 maxSalary;
        string requiredSkills;
    }

    struct Agent {
        string name;
        address owner;
        string title;
        string industry;
        string description;
        string country;
        string level;
        uint256 minSalary;
        uint256 maxSalary;
        string requiredSkills;
        AgentContributor[] contributors;
        uint256 totalReceived;
    }

    mapping(uint256 => Agent) public agents;
    mapping(address => PaymentRecord[]) public studentPayments;
    mapping(uint256 => uint256[]) public snapshotTimestamps; // agentId => timestamps[]
    mapping(uint256 => mapping(uint256 => AgentContributor[])) public contributorSnapshots; // agentId => timestamp => contributors[]

    event AgentCreated(uint256 indexed agentId, string name, address owner);
    event AgentUpdated(uint256 indexed agentId);
    event PaymentDistributed(uint256 indexed agentId, address indexed student, uint256 amount);


    function createAgent(
        AgentMetadata calldata metadata,
        AgentContributor[] calldata agentContributors
    ) external returns (uint256) {
        uint256 total = 0;
        for (uint256 i = 0; i < agentContributors.length; i++) {
            uint256 contributionRate = agentContributors[i].contributionRate;
            total += contributionRate;
        }
        require(total == 10000, "Total contribution must be 10000");

        agentCount += 1;
        uint256 agentId = agentCount;

        Agent storage agent = agents[agentId];
        agent.name = metadata.name;
        // use msg.sender as agentowner;
        agent.owner = msg.sender;
        agent.title = metadata.title;
        agent.industry = metadata.industry;
        agent.description = metadata.description;
        agent.country = metadata.country;
        agent.level = metadata.level;
        agent.minSalary = metadata.minSalary;
        agent.maxSalary = metadata.maxSalary;
        agent.requiredSkills = metadata.requiredSkills;

        for (uint256 i = 0; i < agentContributors.length; i++) {
            agent.contributors.push(agentContributors[i]);
        }

        // manual copy
        AgentContributor[] memory copiedContributors = new AgentContributor[](agentContributors.length);
        for (uint256 i = 0; i < agentContributors.length; i++) {
            copiedContributors[i] = agentContributors[i];
        }
        
        uint256 timestamp = block.timestamp;
        snapshotTimestamps[agentId].push(timestamp);

        AgentContributor[] storage snapshot = contributorSnapshots[agentId][timestamp];
        for (uint256 i = 0; i < agentContributors.length; i++) {
            snapshot.push(agentContributors[i]);
        }

        agentIds.push(agentId);
        emit AgentCreated(agentId, metadata.name, msg.sender);
        return agentId;
    }

    function updateAgentContributors(uint256 agentId, AgentContributor[] calldata updatedContributors) external {
        require(agentId > 0 && agentId <= agentCount, "Invalid agentId");

        uint256 total = 0;
        for (uint256 i = 0; i < updatedContributors.length; i++) {
            total += updatedContributors[i].contributionRate;
        }
        require(total == 10000, "Total contribution must be 10000");

        delete agents[agentId].contributors;
        for (uint256 i = 0; i < updatedContributors.length; i++) {
            agents[agentId].contributors.push(updatedContributors[i]);
        }

        AgentContributor[] memory copiedContributors = new AgentContributor[](updatedContributors.length);
        for (uint256 i = 0; i < updatedContributors.length; i++) {
            copiedContributors[i] = updatedContributors[i];
        }

        uint256 timestamp = block.timestamp;
        snapshotTimestamps[agentId].push(timestamp);
        AgentContributor[] storage snapshot = contributorSnapshots[agentId][timestamp];
        for (uint256 i = 0; i < updatedContributors.length; i++) {
            snapshot.push(updatedContributors[i]);
        }

        emit AgentUpdated(agentId);
    }

    function payAgent(uint256 agentId) external payable {
        require(agentId > 0 && agentId <= agentCount, "Invalid agentId");
        require(msg.value > 0, "Amount must be greater than 0");

        Agent storage agent = agents[agentId];
        require(agent.owner != address(0), "Agent not found");
        require(agent.contributors.length > 0, "No contributors");

        uint256 amount = msg.value;
        // update agent totalReceived
        agent.totalReceived += amount;

        // distribute
        for (uint256 i = 0; i < agent.contributors.length; i++) {
            uint256 share = (amount * agent.contributors[i].contributionRate) / 10000;
            (bool success, ) = agent.contributors[i].contributor.call{value: share}("");
            require(success, "Transfer to contributor failed");
        }

        studentPayments[msg.sender].push(PaymentRecord({
            timestamp: block.timestamp,
            agentId: agentId,
            amount: amount
        }));

        emit PaymentDistributed(agentId, msg.sender, amount);
    }
    

    function getAllAgents() external view returns (uint256[] memory) {
        return agentIds;
    }

    function getAgent(uint256 agentId) external view returns (
        string memory name,
        address owner,
        string memory title,
        string memory industry,
        string memory description,
        string memory country,
        string memory level,
        uint256 minSalary,
        uint256 maxSalary,
        string memory requiredSkills,
        uint256 contributorCount
    ) {
        Agent storage agent = agents[agentId];
        return (
            agent.name,
            agent.owner,
            agent.title,
            agent.industry,
            agent.description,
            agent.country,
            agent.level,
            agent.minSalary,
            agent.maxSalary,
            agent.requiredSkills,
            agent.contributors.length
        );
    }

    function getAgentContributors(uint256 agentId) external view returns (AgentContributor[] memory) {
        return agents[agentId].contributors;
    }


    function getAgentContributionHistory(uint256 agentId) external view returns (uint256[] memory, AgentContributor[][] memory) {
        uint256[] memory timestamps = snapshotTimestamps[agentId];
        AgentContributor[][] memory history = new AgentContributor[][](timestamps.length);

        for (uint256 i = 0; i < timestamps.length; i++) {
            history[i] = contributorSnapshots[agentId][timestamps[i]];
        }

        return (timestamps, history);
    }

    function getStudentPayments(address student) external view returns (PaymentRecord[] memory) {
        return studentPayments[student];
    }

    // check agent totalReceived
    function getAgentTotalReceived(uint256 agentId) external view returns (uint256) {
        require(agentId > 0 && agentId <= agentCount, "Invalid agentId");
        return agents[agentId].totalReceived;
    }

    receive() external payable {}
    fallback() external payable {}
}