import { projectEntriesA } from "./projectEntriesA";
import { projectEntriesB } from "./projectEntriesB";

export const projectsData = [...projectEntriesA, ...projectEntriesB];

// Helper function to get project by ID
export const getProjectById = (id: number) => {
  return projectsData.find(project => project.id === id);
};

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData;
};

