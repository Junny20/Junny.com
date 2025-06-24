const dungeon_button = $("#dungeon");
const other_projects = $("#other-projects");
dungeon_button.on("click", ()=>{window.location.pathname = "/blog"});
other_projects.on("click", ()=>{window.location.pathname = "/other-projects"});
