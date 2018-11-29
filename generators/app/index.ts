import yosay = require('yosay');
import * as Generator from 'yeoman-generator';
import { kebabCase } from 'lodash';
import * as rename from 'gulp-rename';

module.exports = class extends Generator {
    answers: any;

    constructor(args, opts) {
        super(args, opts);
    }

    initializing() {
        this.log(yosay('Create your own npm package!'));
    }

    async prompting() {
        this.answers = await this.prompt([{
            type: 'input',
            name: 'appname',
            message: 'Package name',
            default: this.appname
        }, {
            type: 'input',
            name: 'description',
            message: 'Package description'
        }, {
            type: 'input',
            name: 'gitUser',
            message: 'GitHub user or organization',
        }, {
            type: 'input',
            name: 'authorName',
            message: 'Author name'
        }, {
            type: 'input',
            name: 'authorUsername',
            message: 'Author username'
        }]);
    }

    writing() {
        this.registerTransformStream(rename(path => {
            path.basename = path.basename.replace(/^_/, '');
        }));
        this.fs.copyTpl(
            this.templatePath('**'),
            this.destinationPath(),
            this.replacements()
        );

    }

    install() {
        this.installDependencies({
            npm: true,
            bower: false
        });
    }

    private replacements() {
        return {
            moduleName: kebabCase(this.answers.appname),
            description: this.answers.description,
            authorName: this.answers.authorName,
            authorUsername: this.answers.authorUsername,
            gitUser: this.answers.gitUser
        };
    }
};