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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.universitiesMigration1608751620837 = void 0;
var universitiesMigration1608751620837 = /** @class */ (function () {
    function universitiesMigration1608751620837() {
    }
    universitiesMigration1608751620837.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("\n\t\tupdate university set document_with_weights = setweight(to_tsvector(name), 'A') ||\n\t  setweight(to_tsvector(tags), 'B') ||\n\t  setweight(to_tsvector(university_data), 'C');\n\tCREATE INDEX document_weights_idx\n\t  ON university\n\t  USING GIN (document_with_weights);\n\t\t\tCREATE FUNCTION university_tsvector_trigger() RETURNS trigger AS $$\n\tbegin\n\t  new.document_with_weights :=\n\t  setweight(to_tsvector('english', coalesce(new.name, '')), 'A')\n\t  || setweight(to_tsvector('english', coalesce(new.tags, '')), 'B')\n\t  || setweight(to_tsvector('english', coalesce(new.university_data, '')), 'C');\n\t  return new;\n\tend\n\t$$ LANGUAGE plpgsql;\n\tCREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE\n\t\tON university FOR EACH ROW EXECUTE PROCEDURE university_tsvector_trigger();\n\t\t\t")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    universitiesMigration1608751620837.prototype.down = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return universitiesMigration1608751620837;
}());
exports.universitiesMigration1608751620837 = universitiesMigration1608751620837;
//# sourceMappingURL=1608751620837-universitiesMigration.js.map