import Specialty from '../models/Specialty.js'
import Translation from '../models/Translation.js'
import { Sequelize } from 'sequelize';

Specialty.hasMany(Translation, { foreignKey: 'specialty_id' });
Translation.belongsTo(Specialty, { foreignKey: 'specialty_id' });

async function getSpecialtiesInLanguage(language) {
    try {
        const specialties = await Specialty.findAll({
            include: [
                {
                    model: Translation,
                    where: { language_code: language },
                    required: false,
                },
            ],
            attributes: [
                'id',
                [Sequelize.fn('COALESCE', Sequelize.col('Translations.translated_name'), Sequelize.col('Specialty.default_name')), 'name'],
                [Sequelize.fn('COALESCE', Sequelize.col('Translations.translated_price'), Sequelize.col('Specialty.default_price')), 'price'],
            ],
            order: [[Sequelize.fn('COALESCE', Sequelize.col('Translations.translated_name'), Sequelize.col('Specialty.default_name')), 'ASC']],
        });

        return specialties;
    } catch (error) {
        console.error('Error fetching specialties:', error);
        throw error;
    }
}

export const getPage = async (req, res) => {
    const language = res.locals.preferredLanguage;

    const specialties = await getSpecialtiesInLanguage(language);

    const cardsData = specialties.map(specialty => {
        return {
            name: specialty.getDataValue('name'),
            price: specialty.getDataValue('price'),
        };
    });
    res.render('especialidade', { cards: cardsData });
}