import { useSelector, useDispatch } from "react-redux";
import { getItems, deleteItems } from "../store/items";
import { useEffect } from "react";


const PokemonItems = ({ pokemon, setEditItemId }) => {
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    if (!pokemon.items) return null;
    return pokemon.items.map(itemId => state.items[itemId]);
  });

  useEffect(() => {
    dispatch(getItems(pokemon.id));
  }, [pokemon.id])

  if (!items) {
    return null;
  }

  const handleDelete = (itemId) => {
    dispatch(deleteItems(itemId, pokemon.id))
  }

  return items.map((item) => (
    <tr key={item.id}>
      <td>
        <img
          className="item-image"
          alt={item.imageUrl}
          src={`${item.imageUrl}`}
        />
      </td>
      <td>{item.name}</td>
      <td className="centered">{item.happiness}</td>
      <td className="centered">${item.price}</td>
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => setEditItemId(item.id)}>
            Edit
          </button>
        </td>
      )}
      {pokemon.captured && (
        <td className="centered">
          <button onClick={() => handleDelete(item.id)}>
            Delete
          </button>
        </td>
        
      )}
    </tr>
  ));
};

export default PokemonItems;