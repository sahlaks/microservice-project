"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const projectModels_1 = require("../models/projectModels");
class ProjectRepository {
    createProject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const saveproject = yield projectModels_1.projectModel.create(data);
            return saveproject;
        });
    }
    getProjects() {
        return __awaiter(this, void 0, void 0, function* () {
            const projects = yield projectModels_1.projectModel.find().sort({ createdAt: -1 });
            return projects;
        });
    }
}
exports.ProjectRepository = ProjectRepository;
