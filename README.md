# Remember
Remember is a simple tool to keep task/notes with markdown, also work as  a CMS to manage documents/attachments.  

This web app is created with Angular and Flask. 

To start this app, please follow below steps.


## Env Setup 

1. Install Python27
2. Navigate to the root folder with `cd Remember`
3. run `pip install -r python_requirements.txt` 
4. run `npm install`
5. run `bower install`


## Start app

1. Before start the app, please create the db first:

	- Navigate to the db utils folder with `cd db_utils`
	- run `python db_create.py` 
	- run `python db_migrate.py`
	
2. Run default gulp task to import related JavaScript lib from bower folder:

	- run `gulp`

3. Start the app:

	- Navigate to the root folder with `cd Remember`
	- run `python run.py`

4. Now visit http://localhost:5000/


## Misc

1. Python style check with pylint

    - `pylint --rcfile=pylint.conf app` 

2. JavaScript style check with jshint

    - `gulp jshint`     
    
3. Run JavaScript unit test

    - `karma start`
    - check the test coverage at "Remember\TestFiles\coverage\" folder
    
4. Some atomic gulp tasks under "Remember\gulp_tasks\atomic_tasks\"    

5. Set `app.debug = True` to `False` in "Remember\app\__init__.py" to disable debug mode

    - In non-debug mode, Flask will leverage minified HTML/CSS/JS to reduce HTTP request number/size
    - Minified HTML/CSS/JS were saved in "Remember\app\build\templates" and "Remember\app\build\static" 


## Screenshots

### Task management
![Task management](https://cloud.githubusercontent.com/assets/5880320/13109260/2ba8350e-d5b3-11e5-8e26-dae1ac67f1fd.gif)

### markdown edit/preview
![markdown mode](https://cloud.githubusercontent.com/assets/5880320/13109371/bbb7cd30-d5b3-11e5-8220-5d1eff184cb6.gif)

### Note management
![Note management](https://cloud.githubusercontent.com/assets/5880320/13109372/bbb81ba0-d5b3-11e5-93c6-f2e5138056d2.gif)

### Attachment management
![Attachment management](https://cloud.githubusercontent.com/assets/5880320/13109370/bbb4ae02-d5b3-11e5-9b75-c24818c0c974.gif)

### Category management
![Category management](https://cloud.githubusercontent.com/assets/5880320/13109373/bbbc34ba-d5b3-11e5-9896-4896f6ff6a99.gif)

### Tag management
![Tag management](https://cloud.githubusercontent.com/assets/5880320/13109374/bbc4f3e8-d5b3-11e5-96ef-5e9f507803ce.gif)



