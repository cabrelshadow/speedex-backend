# speedex-backend

username:admin-admin
password:12345

# [Custom hooks ou les helpers avec handlebars](https://handlebarsjs.com/guide/hooks.html#helpermissing)

## if_admin 

permet de vérifier si un utilisateur est admin dans le cadre de nom application
### code de source

```` js
/**
 *  user, ce sont sont les données de l'utilisateur
 * @params user
 * @returns dom 
 */
function if_admin(user, opts) {
	if (user["Role.isAdmin"]) {
		return opts.fn(this);
	}
}
````

```` hbs
{{#if_admin user}}
  *******
  *******
{{/if_admin}}
````

## if_role
le if_role check le rôle de l'utilisateur
```` js
/**
 * 
 * @param {*} user 
 * @param {*} value 
 * @param {*} opts 
 * @returns 
 */
function if_role(user, value, opts) {
	if (
		String(user["Role.name"]).toLocaleLowerCase() ===
			String(value).toLocaleLowerCase() ||
		user["Role.isAdmin"]
	) {
		return opts.fn(this);
	} else return opts.inverse(this);
}
````

### utilisation

````hbs
{{#if_role user "CallCenter"}}
    <li class="nav-item set-active">
    <a href="/callcenter" class="nav-link">
        <span class="sidebar-icon">
        <i class="fab fa-teamspeak"></i>
        </span>
        <span class="sidebar-text">Call center</span>
    </a>
    </li>
{{/if_role}}
````
