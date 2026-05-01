import API from "./axios";

export const CourseService = {
  getAll: () => API.get("/courses"),
  updateProgress: (id, data) =>
    API.put(`/courses/${id}/progress`, data),
  delete: (id) => API.delete(`/courses/${id}`),
};