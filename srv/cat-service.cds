using sds.survey from '../db/data-model';


service CatalogService {
    entity Results as projection on survey.Result;
}
