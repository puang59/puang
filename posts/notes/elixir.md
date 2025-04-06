iex - interactive elixir env
.ex - complied code
.exs - interpreted code

mix - (build tool) generate project, compile and run projects 

:world - called atom and works kinda like a string

function definition -
```ex
def hello do
	:world
end
```

mix compile - to compile the code
iex -S mix - to enter interactive mode

| Feature    | `"hello"` (String)  | `:hello` (Atom)             |
| ---------- | ------------------- | --------------------------- |
| Type       | Binary (UTF-8)      | Atom (Symbol)               |
| Mutability | Mutable             | Immutable                   |
| Storage    | Allocated in memory | Interned (efficient lookup) |
| Use Cases  | Text manipulation   | Identifiers, keys, enums    |
mix.exs - describes our project 
{} - tuple

```ex
# example.exs

defmodule Example do
  use Application

  def start(_type, _args) do
    IO.puts(Example.hello())
    Supervisor.start_link([], strategy: :one_for_one)
  end

  def hello do
    IO.puts("Hello, World!")
  end

end
```

```ex
  #mix.exs
  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      mod: {Example, []},
      extra_applications: [:logger]
    ]
  end
```

here `mod: {Example, []}` defines the base modules to run with empty list denoting no arguments to be passed to the `start` function

`  def start(_type, _args) do`
here the parameters for the start fn is prefixed by `_` denoting that we are not using it inside the fn
if we dont prefix, we'll get warnings while compilation

below example shows fn calling, variable initialization and string concat
```exs
defmodule Example do
  use Application

  def start(_type, _args) do
    name = "Karan"
    hellofn = Example.hello()
    IO.puts("Hello " <> name <> hellofn)
    Supervisor.start_link([], strategy: :one_for_one)
  end

  def hello do
    # IO.puts("hello fn called!")
    " Kumar" # return value
  end
end
```

`Supervisor.start_link([], strategy: :one_for_one)` starts a **supervisor** in Elixir.

- `[]` → This is the list of child processes to supervise (empty here, so no children).
- `strategy: :one_for_one` → If a child process crashes, **only that child** will be restarted, not others.

## **How Supervisors Work in Elixir**

Elixir is built on **Erlang’s BEAM VM**, which is great at **handling failures**.

Instead of preventing errors (which is impossible), it follows the **"Let It Crash"** philosophy:  
If something goes wrong, just restart that part instead of bringing the whole system down.

This is where **Supervisors** come in!

:one_for_one - **If one child crashes, only that child restarts.**
:one_for_all - If one child crashes, all children restart.
:rest_for_one - **If a child crashes, it restarts that child and all children started after it.**

## Install packages using hex
**What is hex?** it is a package manager like npm

look for preferred package on https://hex.pm/packages/ and copy the mix.exs config for it, 
put that in you mix.exs file under deps fn and then in run `mix deps.get`

**Note:** make sure to run `mix local.hex` to install hex

to import it in your file - write `alias`<pacakge_name>
```exs
defmodule Example do
  use Application
  alias UUID
end
```

`x = 5` this is called binding (variable assignment)

```exs
  def main do
    x = 5
    IO.puts(x)
  end
```

### Module attribute
equivalent to `const x = 5` in js, but in elixir we define something called module attribute 

```exs
defmodule Example do
  use Application

  #module attribute
  @x 5 
  
  def start(_type, _args) do
    Example.main()
    Supervisor.start_link([], strategy: :one_for_one)
  end

  def main do
    IO.puts(@x)
  end
end

```
 this @x value can never change now meaning it is a constant variable

### Example Codes
```exs
  def main do
    status = Enum.random([:online, :offline, :idle])

    if status == :online do
      IO.puts("#{@name} is available")
    else 
      IO.puts("#{@name} is not available")
    end

  end
```
switch case
 ```exs
    case status do
      :online -> IO.puts("#{@name} is available")
      :offline -> IO.puts("#{@name} is not available")
      _ -> IO.puts("Error") #default case
    end
```

for multiple if else statement, use `cond`
```exs
    cond do
      status === :online -> IO.puts("#{@name} is available")
      status === :offline -> IO.puts("#{@name} is not available")
      true -> IO.puts("#{@name} is IDLE") # else or fallback condition
    end
```

`IO.puts(?a)` - prints ascii value of a


the booleans `true` and `false` are also the atoms `:true` and `:false`, respectively.
```
  def main do
    name = false

    IO.puts(is_atom(name))
    IO.puts(is_boolean(name))
  end

OUTPUT:
❯ mix
Compiling 1 file (.ex)
Generated example app
true
true
```

Names of modules in Elixir are also atoms. `MyApp.MyModule` is a valid atom, even if no such module has been declared yet.
```
iex> is_atom(MyApp.MyModule)
true
```

An important feature of Elixir is that any two types can be compared; this is particularly useful in sorting. We don’t need to memorize the sort order, but it is important to be aware of it:

```
number < atom < reference < function < port < pid < tuple < map < list < bitstring
```

This can lead to some interesting, yet valid comparisons you may not find in other languages:

```
iex> :hello > 999
true
iex> {:hello, :world} > [1, 2, 3]
false
```

## List
Elixir implements list collections as linked lists. This means that accessing the list length is an operation that will run in linear time (`O(n)`). For this reason, it is typically faster to prepend than to append:

```
iex> list = [3.14, :pie, "Apple"]
[3.14, :pie, "Apple"]
# Prepending (fast)
iex> ["π" | list]
["π", 3.14, :pie, "Apple"]
# Appending (slow)
iex> list ++ ["Cherry"]
[3.14, :pie, "Apple", "Cherry"]
```

lists are immutable meaning if you prepend or append, then you have to create a new list

```exs
  def main do
    list = ["kumar"]
    prepend_list = ["karan" | list] #fast
    append_list = list ++ ["karan"] #slow O(n)
    IO.puts(append_list)
  end
```
list concat
```
[1, 2] ++ [3, 4, 1]
[1, 2, 3, 4, 1]
```
When using lists, it is common to work with a list’s head and tail. The head is the list’s first element, while the tail is a list containing the remaining elements. Elixir provides two helpful functions, `hd` and `tl`, for working with these parts:

```
iex> hd [3.14, :pie, "Apple"]
3.14
iex> tl [3.14, :pie, "Apple"]
[:pie, "Apple"]
```

```exc
  def main do
    list = ["b"]
    prepend_list = ["a" | list] #fast
    append_list = list ++ ["c"] #slow

    new_list = prepend_list ++ append_list
    IO.puts(is_list(new_list))

    IO.puts(hd new_list)
    IO.puts(tl new_list)

#another method
    [head | tail] = new_list
    IO.puts(head)
    IO.puts(tail)
  end
```

### Tuples
Tuples are similar to lists, but are stored contiguously in memory. This makes accessing their length fast but modification expensive; the new tuple must be copied entirely to memory. Tuples are defined with curly braces:

```
iex> {3.14, :pie, "Apple"}
{3.14, :pie, "Apple"}
```

It is common for tuples to be used as a mechanism to return additional information from functions

### Keyword list
```exs
# These are identical
options = [name: "John", age: 30]
options = [{:name, "John"}, {:age, 30}]

# Access values
options[:name]  # Returns "John"

# Add a new item
new_options = options ++ [location: "New York"]

# Keys can be duplicated
prefs = [sort: :asc, sort: :desc]  # Both values are kept
```

## Maps
unordered key-value collections that can use any value as a key:
```exc
  def main do
    list = [name: "karan", title: "kumar"]
    list2 = [{:name, "karan"}, {:title, "kumar"}]
    IO.puts(list[:name])
    IO.puts(list2[:name])

    # person = %{name: "aviral", age: 20}
    person = %{:name => "aviral", :age => 19}
    IO.puts(person.age);
    updated_person = %{person | :age => 22}
    IO.puts(updated_person.age);
  end
```

```exc
# Create a map
person = %{name: "Alice", age: 25}
mixed = %{:name => "Bob", "status" => "active", 42 => "answer"}

# Access values
person[:name]    # Returns "Alice"
person.name      # Only works with atom keys! Returns "Alice"
mixed["status"]  # Returns "active"

# Update existing key (creates new map)
updated = %{person | age: 26}  # Returns %{name: "Alice", age: 26}

# Add new key
with_job = Map.put(person, :job, "Developer")

# Try to update non-existing key
# %{person | job: "Developer"}  # This would raise KeyError!
```

#### format
```
  def main do
    a = 0.1
    :io.format("~.2f\n", [a])
  end
```
